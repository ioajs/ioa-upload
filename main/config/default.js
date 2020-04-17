'use strict';

module.exports = {
  "@ioa/koa": {
    "port": 9800,
  },
  "lib": {
    // "savePath": "D:/Nodejs/Project/ioa/@ioa-upload/xxxx",
    "baseHref": "http://127.0.0.1/static",
    "whitelist": [
      ".jpg",
      ".png",
      ".xml",
      ".csv",
      ".mp4"
    ],
    "limits": {}
  },
}
