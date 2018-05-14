const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离css文件
module.exports = merge(baseConfig,{
    output: {
        path: PATHS.dist,
        publicPath: "dist",
        filename: "[name]/bundle.[hash].js", //dev-server环境不能使用chunkhash
        chunkFilename: "[name].[chunkhash].js"
    },
    plugins:[
        new CleanWebpackPlugin(Object.keys(htmls).concat("assets"), { //清除文件夹
            root: path.resolve(__dirname, "./dist"),
            verbose: true,
            dry: false,
            exclude: [path.resolve(__dirname, "./dist/common"), ],
        }),
        new ExtractTextPlugin({ //抽离css文件
            filename: "[name]/style/[contenthash].css?",
            ignoreOrder: true,
        }),
    ]
})