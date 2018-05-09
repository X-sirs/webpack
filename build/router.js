console.log("1111");
const render = require('../dist/server/server.js');
console.log("2222")
const router = require('koa-router')()
router.get('*', render)
module.exports = router