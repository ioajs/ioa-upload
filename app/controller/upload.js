'use strict';

const app = require('ioa');
const fs = require('fs-extra');
const Busboy = require('busboy');

class upload {
   async index(ctx) {

      if (ctx.method === 'POST') {

         const data = { imgs: [] };

         const { category } = ctx.params;

         const busboy = new Busboy({ headers: ctx.headers });

         const date = new Date()

         const relativePath = `${category}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`

         const absolutePath = `${app.cwd}/public/${relativePath}`

         await fs.ensureDir(absolutePath)

         const transaction = []
         const random = String(Math.random()).slice(-5)

         // 文件类型
         busboy.on('file', function (fieldname, readableStream, filename) {
            const [, name, suffix] = filename.match(/^(.+)\.(.+)$/)
            filename = `${name}_${random}.${suffix}`
            data.imgs.push(relativePath + filename)
            const writeStream = fs.createWriteStream(absolutePath + filename)
            transaction.push(writeStream)
            readableStream.pipe(writeStream)
         })

         // 字段类型
         busboy.on('field', function (fieldname, value) {
            data[fieldname] = value
         });

         // 上传完成异步包装器
         const promise = new Promise(function (resolve) {
            busboy.on('finish', resolve)
         })

         // 上传失败时删除所有写入流
         ctx.req.on('error', function () {
            for (const item of transaction) {
               item.destroy()
            }
         })

         ctx.req.pipe(busboy)

         await promise

         ctx.body = { data }

      }

   }

}

module.exports = upload