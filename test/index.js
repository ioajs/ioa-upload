'use strict';

const test = require('jtf')
const typea = require('typea')
const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:9800';

test('upload', async t => {

   const result = await axios.post(`/upload/user`, { })

   const { data, error } = typea.strict(result.data, {
      uid: Number,
      name: String,
      image: String,
      phone: String,
   })

   t.ok(data, error)

})