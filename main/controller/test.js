'use strict';

module.exports = async function (ctx) {
   ctx.body = `
   <html><head></head><body>
      <form method="POST" enctype="multipart/form-data" action="/upload/test">
         <input type="text" name="textfield"><br />
         <input type="file" name="filefield" multiple><br />
         <input type="submit">
      </form>
   </body></html>
   `
}