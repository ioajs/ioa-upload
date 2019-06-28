"use strict";

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         '@ioa/koa': {
            "enable": true,
         },
         "./lib": {
            "enable": true,
         }
      },
   },
});