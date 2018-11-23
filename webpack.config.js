var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    "indexEntry": "./public/site/js/script.js",
    "tictactoeEntry": "./public/tictactoe/js/script.js",
    "calculatorEntry": "./public/calculator/js/script.js"
  },
  output: {
    path: "./public/src",
    filename: "[name].js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};