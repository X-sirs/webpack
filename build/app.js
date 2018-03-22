require("babel-core/register");
require("babel-polyfill");
const Koa = require("koa");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const koaStatic = require("koa-static");
const hotServer = require("./hotserver.js").default;
const app = new Koa();
const path = require("path");
const handle = require('../dist/server.js');
app.use(cookieParser());
app.use(bodyParser.json());
const config = require("../webpack.config.dev.js");
const compiler = require("webpack")(config);
app.use(hotServer.devMiddleware(compiler, {
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
app.use(hotServer.hotMiddleware(compiler, {
  // log: console.log, 
  // path: '/__webpack_hmr', 
  // heartbeat: 10 * 1000 
}))
app.use("/assets", koaStatic(path.resolve(__dirname,"../dist/assets")));
app.use(handle);
app.listen("3008", () => {
  console.log("app is running on 3008");
});
