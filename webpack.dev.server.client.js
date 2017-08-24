    var config = require("./webpack.config.dev.js");
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        contentBase:'dist/',
        publicPath: "dist/",
        hot:true,
        historyApiFallback: false,
        compress: true,
        headers: { "X-Custom-Header": "yes" },
        stats: { colors: true }
    });
    server.listen(8128,"localhost", function() {
        console.log("正在监听8128端口")
    });