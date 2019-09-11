'use strict';

module.exports = {
   "@ioa/koa": {
      "port": 9800,
   },
   "lib": {
      // "savePath": "D:/Nodejs/Project/ioa/@ioa-upload/xxxx",
      "whitelist": [
         ".jpg",
         ".png",
         ".xml",
         ".csv"
      ],
      "limits": {}
   },
}