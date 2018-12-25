'use strict';

const ioa = require('ioa')

const axios = require('axios')

ioa.http()

axios.defaults.baseURL = 'http://localhost:9900';

module.exports = {
   axios
}