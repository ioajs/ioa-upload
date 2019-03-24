'use strict';

module.exports = {
   '@ioa/http': {
      "enable": true,
      options(ioa, options) {
         Object.assign(ioa.options, options);
      }
   },
   "./app": {
      "enable": true,
   }
}