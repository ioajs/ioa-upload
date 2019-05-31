'use strict';

module.exports = {
   "components": {
      "@ioa/http": {
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