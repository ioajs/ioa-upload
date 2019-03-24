'use strict';

const { router, middleware } = require('@app');

const { role, upload } = middleware;

router.post('/upload/:category', upload, 'upload.upload');