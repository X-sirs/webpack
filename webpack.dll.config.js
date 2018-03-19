const webpack = require("webpack");
const path = require("path");
module.exports = {
  mode:"development",
  entry: {
    vendors: [
      "react",
      "react-dom",
      "react-router-dom"
    ],
  },
  output: {
    filename: "[name].dll.js",
    path:path.join(__dirname, "./dist/common"),
    library: "[name]_lib",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./manifest.json"),
      name: "[name]_lib",
    }),
  ],
};
