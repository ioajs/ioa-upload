'use strict';

const test = require('jtf')
const typea = require('typea')
const { apps } = require('ioa')
const { axios } = require('./helpers/')

const { auth } = apps

test('upload', async t => {

   let result = await axios.post(`/upload/user`, {})

   let { data, error } = typea.strict(result.data, {
      uid: Number,
      name: String,
      image: String,
      phone: String,
   })

   t.ok(data, error)

})