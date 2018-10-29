const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    lib: ["react", "react-dom", "react-router-dom"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.join(__dirname, "./dist/common"),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./manifest.json"),
      name: "[name]",
      context: __dirname
    })
  ],
  optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
  }
};
