'use strict';

require('../index.js');
const fs = require('fs');
const test = require('jtf');
const typea = require('typea');
const axios = require('axios');
const FormData = require('form-data');

axios.defaults.baseURL = 'http://localhost:9800';

test('upload', async t => {

   const formData = new FormData();

   // formData.append("files", fs.createReadStream('./test/95359.jpg'));
   formData.append("uid", 1);
   formData.append("name", 'dxx');

   const result = await axios.post(`/upload/user`, formData)

   console.log(result.data)

   const { data, error } = typea.strict(result.data, {
      uid: Number,
      name: String,
   })

   t.ok(data, error);

})