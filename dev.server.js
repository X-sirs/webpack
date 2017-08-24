    var config = require("./webpack.config.dev.js");
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        publicPath: "dist",
        hot:true,
        inline:true,
        historyApiFallback:false,
        compress: true,
        stats: { colors: true }
    });
    server.listen(8500, function() {
        console.log("正在监听8500端口")
    });