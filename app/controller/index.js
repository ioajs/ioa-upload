'use strict';

class index {
   async upload(ctx) {

      ctx.body = {
         data: ctx.request.body
      }

   }
}

module.exports = index 