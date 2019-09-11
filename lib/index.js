'use strict';

const app = require('@app');

module.exports = {
   "config": null,
   "middleware": {
      "level": 30,
      after({ data }) {
         app.emit('middleware', data);
      }
   }
}