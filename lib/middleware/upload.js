'use strict';

const app = require('@app');
const fs = require('fs-extra');
const Busboy = require('busboy');

const { config } = app;

let whitelist = [
  ".jpg",
  ".png"
]

if (config.whitelist) {
  whitelist = config.whitelist;
}

const { limits = {}, savePath = `${process.cwd()}/static`, baseUrl = '' } = config;

module.exports = async function (ctx, next) {

  const { category } = ctx.params;

  const date = new Date();

  const relativePath = `${category}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;

  await fs.ensureDir(`${savePath}/${relativePath}`);

  const random = String(Math.random()).slice(-5);

  let state;
  const promise = new Promise((resolve, reject) => {
    state = { resolve, reject }
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

      state.reject({
        "code": 1000,
        "error": `不支持${suffix}格式的文件`
      })

    }

  })

  // 字段类型
  busboy.on('field', function (fieldname, value) {
    data[fieldname] = value;
  })

  busboy.on('finish', state.resolve);

  ctx.req.pipe(busboy);

  ctx.req.on('error', function () {
    state.reject({
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