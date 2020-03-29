'use strict';

const app = require('@app');
const fs = require('fs-extra');
const Busboy = require('busboy');

const { config } = app;

let whitelist = [
  ".jpg",
  ".png",
  ".mp4",
]

if (config.whitelist) {
  whitelist = config.whitelist;
}

const { limits = {}, savePath = `${process.cwd()}/static`, baseUrl = '' } = config;

module.exports = async function (ctx, next) {

  const { category } = ctx.params;

  const date = new Date();

  let relativePath = `${category}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;

  // 使用@ioa/auth组件时，按角色和用户id进行分组
  const { auth } = ctx;
  if (auth) {
    relativePath = `${auth.role}/${auth.id}/${relativePath}`;
  }

  await fs.ensureDir(`${savePath}/${relativePath}`);

  const random = String(Math.random()).slice(-5);

  const promiseCb = {};
  const promise = new Promise((resolve, reject) => {
    promiseCb.resolve = resolve;
    promiseCb.reject = reject;
  })

  const busboy = new Busboy({ headers: ctx.headers, limits });

  const data = {};

  // 文件类型
  busboy.on('file', function (fieldname, readableStream, filename) {

    if (!filename) {
      readableStream.resume();
      return;
    }

    const [, name, suffix] = filename.match(/^(.+)(\..+)$/);

    if (whitelist.includes(suffix)) {

      filename = `${name}_${random}${suffix}`;

      const filePath = relativePath + filename;

      if (!data[fieldname]) {
        data[fieldname] = [];
      }

      data[fieldname].push(`${baseUrl}/${filePath}`);

      const writeStream = fs.createWriteStream(`${savePath}/${filePath}`);

      readableStream.pipe(writeStream); // 绑定可写流到可读流

    } else {

      promiseCb.reject({
        "code": 1000,
        "error": `不支持${suffix}格式的文件`
      })

    }

  })

  // 字段类型
  busboy.on('field', function (fieldname, value) {
    data[fieldname] = value;
  })

  busboy.on('finish', promiseCb.resolve);

  ctx.req.pipe(busboy);

  ctx.req.on('error', function () {
    promiseCb.reject({
      "code": 1000,
      "error": `上传失败`
    })
  })

  await promise.then(async function () {

    ctx.upload = data;

    await next();

  }).catch(error => {

    ctx.body = error;

  })

}