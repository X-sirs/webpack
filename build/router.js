const render = require('../dist/server/server.js');
const router = require('koa-router')()
router.get('*', render);
module.exports = router