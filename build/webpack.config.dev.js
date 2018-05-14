const merge = require("webpack-merge");
const {getEntries} = require("./build/utils");
const  baseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const devConfig = merge(baseConfig,{
   mode: "development",
   entry: getEntries("./src/index.js"),
   devServer: {
     contentBase: "dist",
     hot: true,
     historyApiFallback: true
   },
   plugins:[
        new CleanWebpackPlugin(Object.keys(entries).concat("assets"), {
          //清除文件夹
          root: path.resolve(__dirname, "./dist"),
          verbose: true,
          dry: false,
          exclude: [path.resolve(__dirname, "./dist/common")]
        }),
        new HtmlWebpackPlugin({
          filename: "index.html",
          template: "index.html",
          chunks: Object.keys(entries)
        }),
        new webpack.HotModuleReplacementPlugin(),
   ]
});
module.exports = devConfig;