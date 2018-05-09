const webpack = require("webpack");
const path = require("path");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//const WriteFilePlugin = require("write-file-webpack-plugin"); //生成打包后的文件,由于hmr也会产生，所以采用gulp处理
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
//const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离css文件
const BabiliPlugin = require("babili-webpack-plugin"); //压缩js  
const glob = require("glob");

function getEntries(globPath) { //获取所有文件入口
    let files = glob.sync(globPath),
        entries = {};
    files.forEach(function(filePath) {
        let name = filePath.substr(0, filePath.lastIndexOf("/"));
        let names = name.substring(name.lastIndexOf("/") + 1, name.length);
        entries[names] =path.resolve(__dirname, name);
    });
    return entries;
}
var entries = getEntries("./src/index.js");
console.log(entries);
var webapckConfig = {
  mode: "development",
  context: path.join(__dirname, "./src"),
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "/",
    filename: "index.[hash].js", //dev-server环境不能使用chunkhash
    chunkFilename: "[name].[chunkhash].js"
  },
  devServer: {
    contentBase: "dist",
    hot: true,
    historyApiFallback: true
  },
  performance: {
    //文件大小检查
    hints: "warning",
    maxEntrypointSize: 400000,
    maxAssetSize: 10000000
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 512,
          name: "assets/image/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "assets/audio/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/font/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader",
        options: {
          modules: true
        }
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   //抽离css文件
    //   filename: "assets/css/index.[contenthash].css",
    //   ignoreOrder: true
    // }),
    new webpack.DllReferencePlugin({
      //分离第三方库
      context: __dirname,
      manifest: require("./manifest.json")
    }),
    new webpack.ProvidePlugin({
      react: "react"
    }),
    new BabiliPlugin(), //压缩js文件--(会压缩require，对require.ensure有影响)
    // new webpack.optimize.CommonsChunkPlugin({
    //   //提取公共模块
    //   name: "commons",
    //   filename: "assets/js/commons.js",
    //   chunks: Object.keys(entries)
    // }),
    new webpack.HotModuleReplacementPlugin(), //热更新
    new webpack.NoEmitOnErrorsPlugin(), //编译后将错误输出
    // new WriteFilePlugin({    //输出内存文件系统中的打包文件
    //     force: true,
    //     useHashIndex: false,
    // })
    new ProgressBarPlugin({ summary: false }),
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
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 3,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          chunks: "all",
          minChunks: 3,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons",
          filename: "assets/js/common.js"
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
          filename: "assets/js/vendor.js"
        }
      }
    },
    runtimeChunk: false
  }
};
module.exports = webapckConfig;