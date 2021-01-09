'use strict';

const fs = require('fs');
const app = require('@app');
const Busboy = require('busboy');

const fsPromises = fs.promises;

const { config } = app;
const { limits = {}, baseHref = '' } = config;
const { whitelist = [".jpg", ".png", ".gif", ".mp4"] } = config;
const { savePath = `${process.cwd()}/static` } = config;


module.exports = function (mode) {

  return async function (ctx, next) {

    let spacePath = '';

    if (ctx.spacePath) {
      spacePath = ctx.spacePath;
    }

    await fsPromises.mkdir(`${savePath}/${spacePath}`, { recursive: true });

    const promiseState = {};
    const promise = new Promise((resolve, reject) => {
      promiseState.resolve = resolve;
      promiseState.reject = reject;
    });

    const data = {};

    const busboy = new Busboy({ headers: ctx.headers, limits });

    // 文件类型
    busboy.on('file', async function (fieldname, readableStream, filename) {

      if (!filename) {
        readableStream.resume();
        return;
      }

      const [, name, suffix] = filename.match(/^(.+)(\.\w+)$/);

      if (whitelist.includes(suffix)) {

        let filePath = `${spacePath}/${filename}`;

        // 检查文件是否存在
        const isExist = await fsPromises.access(`${savePath}/${filePath}`)
          .then(() => { return true })
          .catch(() => { return false });

        // 文件已存在
        if (isExist === true) {

          if (mode === 'create') {
            // create模式下需要重命名，防止命名冲突
            filePath = `${spacePath}/${name}_${Date.now()}${suffix}`;
          }

        } else if (mode === 'update') {

          // update模式下未找到原文件时直接报错
          promiseState.reject({
            "code": 1000,
            "error": `原文件不存在，更新失败`
          })

          return;

        }

        if (!data[fieldname]) {
          data[fieldname] = [];
        }

        data[fieldname].push(`${baseHref}/${filePath}`);

        const writeStream = fs.createWriteStream(`${savePath}/${filePath}`);

        readableStream.pipe(writeStream); // 数据流绑定

      } else {

        promiseState.reject({
          "code": 1000,
          "error": `不支持${suffix}格式的文件`
        })

      }

    })

    // 字段类型
    busboy.on('field', function (fieldname, value) {
      data[fieldname] = value;
    })

    // 上传完成
    busboy.on('finish', promiseState.resolve);

    ctx.req.pipe(busboy);

    ctx.req.on('error', function () {

      promiseState.reject({
        "code": 1000,
        "error": `文件上传失败`
      });

    })

    await promise.then(async function () {

      ctx.upload = data;

      await next();

    }).catch(error => {

      busboy.destroy();

      ctx.body = error;

    })

  };

}
