'use strict';

const app = require('@app');

app.loader({
  middleware: {
    level: 30,
    after({ data }) {
      app.emit('middleware', data);
    }
  }
})
