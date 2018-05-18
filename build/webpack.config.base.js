const webpack = require("webpack");
const path = require("path");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin"); //压缩js  
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webapckConfig = {
  context: path.join(__dirname, "../src"),//项目入口上下文
  performance: {
    //文件大小检查
    hints: "warning",
    maxEntrypointSize: 400000,
    maxAssetSize: 10000000
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".css", ".less",".sass", ".scss", ".png", ".jpg"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env","es2015", "react", "stage-0"]
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
        use:['style-loader','css-loader'] ,
      },
      {
        test: /\.(sass|scss)?$/,
        exclude: /node_modules/,
        use:['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.(csv|tsv)$/, 
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      //分离第三方库
      context: __dirname,
      manifest: require("../manifest.json")
    }),
    new webpack.ProvidePlugin({
      react: "react"
    }),
    new BabiliPlugin(), //压缩js文件--(会压缩require，对require.ensure有影响)
    new webpack.NoEmitOnErrorsPlugin(), //编译后将错误输出
    new ProgressBarPlugin({ summary: false })
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