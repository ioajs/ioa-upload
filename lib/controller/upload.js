'use strict';

class Upload {
   async upload(ctx) {

      ctx.body = {
         data: ctx.request.body
      }

   }
}

module.exports = Upload;