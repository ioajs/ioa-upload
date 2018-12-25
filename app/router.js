'use strict';

const { router, middleware } = require('@app')

const { role, upload } = middleware

// role('auth.role')

router.post('/upload/:category', upload, 'index.upload')