'use strict';

const { router, middleware } = require('@app');

const { parser, upload, create, update } = middleware;

router.get('/', "test");

router.post('/static/user', parser, upload('create'), 'response');

router.put('/static/user', parser, upload('update'), 'response');

// router.delete('/static/user', 'destroy');
