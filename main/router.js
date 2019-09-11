'use strict';

const { router, middleware } = require('@app');

const { upload } = middleware;

router.get('/', "home.test");

router.post('/upload/:category', upload, 'home.upload');