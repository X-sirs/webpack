const webpack = require("webpack");
const path = require("path");
//const WriteFilePlugin = require("write-file-webpack-plugin"); //生成打包后的文件,由于hmr也会产生，所以采用gulp处理
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理
const CleanWebpackPlugin = require("clean-webpack-plugin"); 
//const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离css文件
const BabiliPlugin = require("babili-webpack-plugin"); //压缩js  
const glob = require("glob");
var webapckConfig = {
  name: "SSR",
  mode:"none",
  target: 'node',
  context: path.join(__dirname, "./"),
  entry: {
    server: ["babel-polyfill", "./index.server.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "server.js", //dev-server环境不能使用chunkhash
    chunkFilename: "server/[name].[chunkhash].server.js"
  },
  devtool: "source-map",
  performance: {
    //文件大小检查
    hints: "warning",
    maxEntrypointSize: 400000,
    maxAssetSize: 10000000
  },
  resolve: {
    mainFiles: ["index.web", "index"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", "json"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "es2015-loose", "react", "stage-0"]
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
          limit: 10000
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
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true
    }),
    new BabiliPlugin(), //压缩js文件--(会压缩require，对require.ensure有影响)
    // new webpack.optimize.CommonsChunkPlugin({
    //   //提取公共模块
    //   name: "commons",
    //   filename: "assets/js/commons.js",
    //   chunks: "server"
    // }),
    //new webpack.HotModuleReplacementPlugin(), //热更新
    new webpack.NoEmitOnErrorsPlugin(), //编译后将错误输出
    // new WriteFilePlugin({    //输出内存文件系统中的打包文件
    //     force: true,
    //     useHashIndex: false,
    // })
    new CleanWebpackPlugin(["server"], {
      //清除文件夹
      root: path.resolve(__dirname, "./dist"),
      verbose: true,
      dry: false,
      exclude: [path.resolve(__dirname, "./dist/common")]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
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
          filename: "assets/js/commons.js"
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