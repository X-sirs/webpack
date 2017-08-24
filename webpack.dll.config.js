const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: {
    vendors: ['vue']
  },
  output: {
    filename: '[name].dll.js',
    path:path.join(__dirname, './dist/common'),
    library: '[name]_lib'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './[name]-manifest.json'),
      name: '[name]_lib'
    }),
  ],
}
