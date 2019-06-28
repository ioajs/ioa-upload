'use strict';

module.exports = {
   "components": {
      "@ioa/koa": {
         "port": 9800,
      },
      "./app": {
         "suffix": [
            ".jpg",
            ".png",
            ".xml",
            ".csv"
         ]
      },
   },
}