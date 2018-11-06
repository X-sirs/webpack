
// require("babel-core/register");
const Koa = require("koa");
const koaBody = require("koa-bodyparser");
const koaStatic = require("koa-static");
const app = new Koa();
const path = require("path");
const middleware = require('koa-webpack-middleware');
// const hotServer = require("./hotserver.js").default;
const config = require("./webpack.config.dev.js");
const compiler = require("webpack")(config);
const index = require("./router.js");
app.use(koaBody());
app.use(middleware.devMiddleware(compiler, {
    // display no info to console (only warnings and errors) 
    noInfo: false,
    // display nothing to the console 
    quiet: false,
    hot:true,
    inline:true,
    // switch into lazy mode 
    // that means no watching, but recompilation on every request 
    lazy: true,
    // watch options (only lazy: false) 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // public path to bind the middleware to 
    // use the same as in webpack 
    publicPath: "/",
    // custom headers 
    headers: { "X-Custom-Header": "yes" },
    // options for formating the statistics 
    stats: {
        colors: true
    }
}));
app.use(middleware.hotMiddleware(compiler, {
  // log: console.log, 
  // path: '/__webpack_hmr', 
  // heartbeat: 10 * 1000 
}));
app.use(index.routes(), index.allowedMethods())
app.use(koaStatic(path.resolve(__dirname,"../dist/assets")));
// app.use(handle);
app.listen("3008", () => {
  console.log("app is running on 3008");
});
