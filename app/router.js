'use strict';

const { router, middleware } = require('ioa')

// const { role } = middleware

// role('auth.role')

router.post('/upload/:category', 'upload.index')