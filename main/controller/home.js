'use strict';

module.exports = {
   async test(ctx) {

      ctx.body = `
      <html>
         <head>
            <title>表单、文件上传</title>
         </head>
         <body>
            <form method="POST" enctype="multipart/form-data" action="/upload/test">
               <br/>
               <input type="text" name="username">
               <br/><br/>
               <input type="text" name="age">
               <br/><br/>
               <input type="file" name="filefield" multiple>
               <br/><br/>
               <input type="submit">
            </form>
         </body>
      </html>
      `

   },
   async upload(ctx) {

      ctx.body = ctx.upload;

   },
}