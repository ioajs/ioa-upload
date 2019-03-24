'use strict';

const { config, cwd } = require('@app');
const fs = require('fs-extra');
const Busboy = require('busboy');

let basePath = `${cwd}/static`;

if (config.savePath) {
   basePath = config.savePath;
}

module.exports = async function (ctx, next) {

   const data = { files: [] };

   const { category } = ctx.params;

   const busboy = new Busboy({ headers: ctx.headers });

   const date = new Date()

   const relativePath = `${category}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`

   const absolutePath = `${basePath}/${relativePath}`

   await fs.ensureDir(absolutePath)

   const transaction = []
   const random = String(Math.random()).slice(-5)

   let state
   const promise = new Promise((resolve, reject) => state = { resolve, reject })

   // 文件类型
   busboy.on('file', function (fieldname, readableStream, filename) {
      const [, name, suffix] = filename.match(/^(.+)(\..+)$/)
      if (config.suffix.includes(suffix)) {
         filename = `${name}_${random}${suffix}`
         data.files.push(relativePath + filename)
         const writeStream = fs.createWriteStream(absolutePath + filename)
         // 绑定可写流到可读流
         readableStream.pipe(writeStream)
         transaction.push(writeStream)
      } else {
         state.reject({
            "code": 1000,
            "msg":`不支持${suffix}文件类型`
         })
      }
   })

   // 字段类型
   busboy.on('field', function (fieldname, value) {
      data[fieldname] = value
   })

   busboy.on('finish', state.resolve)

   // 上传失败时删除所有写入流
   ctx.req.on('error', function () {
      for (const item of transaction) {
         item.destroy()
      }
      state.reject({
         "code": 1000,
         "msg":`上传失败`
      })
   })

   // 绑定可写流到可读流
   ctx.req.pipe(busboy)

   await promise.then(async function () {

      ctx.request.body = data

      await next()

   }).catch(function (error) {

      ctx.body = error

   })

}