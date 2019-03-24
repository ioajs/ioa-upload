'use strict';

const test = require('jtf')
const typea = require('typea')
const axios = require('axios')
const ioa = require('ioa');

ioa.loader();

ioa.http();

return

axios.defaults.baseURL = 'http://localhost:9800';

test('upload', async t => {

   let result = await axios.post(`/upload/user`, {

   })

   let { data, error } = typea.strict(result.data, {
      uid: Number,
      name: String,
      image: String,
      phone: String,
   })

   t.ok(data, error)

})