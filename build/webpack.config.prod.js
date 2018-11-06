const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理
const MiniExtractCss = require("mini-css-extract-plugin");
const prodConfig = merge(baseConfig, {
    mode: "production",
    target: "web",
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "[name]/js/index.[hash].js", //dev-server环境不能使用chunkhash
        chunkFilename: "assets/js/[name].[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniExtractCss.loader, "style-loader", "css-loader", 'postcss-loader']
            },
            {
                test: /\.(sass|scss)?$/,
                exclude: /node_modules/,
                use: [MiniExtractCss.loader, "css-loader", "sass-loader", 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        new MiniExtractCss({
            //抽离css文件
            filename: "assets/style/[name].[contenthash].css",
            ignoreOrder: true
        })
    ]
});
module.exports = prodConfig;