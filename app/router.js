'use strict';

const { router, } = require('@app');

router.post('/upload/:category', "upload", 'upload.upload');