/*
 * @Author: chencong 
 * @Date: 2018-04-22 14:52:17 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 16:09:42
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
  entry: {
    common: ["./src/page/common/index.js"],
    index: ["./src/page/index/index.js"],
    login: ["./src/page/login/index.js"]
  },
  output: {
    path: "./dist",
    filename: "js/[name].js"
  },
  externals: {
    jquery: "window.jQuery"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    }),
    new ExtractTextPlugin("css/[name].css")
  ]
};

module.exports = config;
