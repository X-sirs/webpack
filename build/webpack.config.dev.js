const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
// const {getEntries} = require("./utils");
const  baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理

const devConfig = merge(baseConfig,{
   mode: "development",
   target: "web",
   entry: path.resolve(__dirname,"../src/index.js"),
   output: {
     path: path.resolve(__dirname, "../dist"),
     publicPath: "/",
     filename: "[name]/js/build-[hash].js", //dev-server环境不能使用chunkhash
   },
   plugins:[
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject:true
    }),
    new webpack.HotModuleReplacementPlugin()
   ]
});
module.exports = devConfig;