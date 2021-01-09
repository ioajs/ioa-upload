'use strict';

const app = require('@app');

app.loader({
  "middleware.js": {
    level: 30,
    module(upload) {
      app.emit('middleware', { upload });
    }
  }
})
