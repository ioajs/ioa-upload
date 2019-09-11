'use strict';

const app = require('@app');
const fs = require('fs-extra');
const Busboy = require('busboy');

const { config } = app;

let savePath = '';

if (config.savePath) {
   savePath = config.savePath;
} else {
   savePath = `${process.cwd()}/static`;
}

let suffixs = [
   ".jpg",
   ".png"
]

if (config.suffixs) {
   suffixs = config.suffixs;
}

module.exports = async function (ctx, next) {

   const { category } = ctx.params;

   const date = new Date();

   const relativePath = `${category}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;

   const absolutePath = `${savePath}/${relativePath}`;

   await fs.ensureDir(absolutePath);

   const transaction = [];
   const random = String(Math.random()).slice(-5);

   let state;
   const promise = new Promise((resolve, reject) => {
      state = { resolve, reject }
   })

   const busboy = new Busboy({ headers: ctx.headers });

   const files = [];
   const fields = {};

   // 文件类型
   busboy.on('file', function (fieldname, readableStream, filename) {

      const [, name, suffix] = filename.match(/^(.+)(\..+)$/);

      if (suffixs.includes(suffix)) {

         filename = `${name}_${random}${suffix}`;
         files.push(relativePath + filename);
         const writeStream = fs.createWriteStream(absolutePath + filename);

         readableStream.pipe(writeStream); // 绑定可写流到可读流
         transaction.push(writeStream);

      } else {

         state.reject({
            "code": 1000,
            "error": `不支持${suffix}类型的文件`
         })

      }

   })

   // 字段类型
   busboy.on('field', function (fieldname, value) {
      fields[fieldname] = value;
   })

   busboy.on('finish', state.resolve);

   ctx.req.pipe(busboy); // stream读写绑定

   // 上传失败（中断）时删除所有写入流
   ctx.req.on('error', function () {
      state.reject({
         "code": 1000,
         "error": `上传失败`
      })
   })

   await promise.then(async function () {

      ctx.upload = { files, fields };

      await next();

   }).catch(error => {

      ctx.body = error;

      for (const item of transaction) {
         item.destroy();
      }

   })

}