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
               用户名：<input type="text" name="username">
               <br/><br/>
               年　龄：<input type="text" name="age">
               <br/><br/>
               头　像：<input type="file" name="headPortrait">
               <br/><br/>
               附　件：<input type="file" name="annex" multiple> (多选)
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