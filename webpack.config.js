/*
 * @Author: chencong 
 * @Date: 2018-04-22 14:52:17 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 15:39:05
 */
var webpack = require("webpack");
var config = {
  entry: {
    common: ['./src/page/common/index.js'],
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "js/base.js"
    })
  ]
};

module.exports = config;
