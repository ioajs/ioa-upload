"use strict";

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         '@ioa/http': {
            "enable": true,
         },
         "./app": {
            "enable": true,
         }
      },
   },
});