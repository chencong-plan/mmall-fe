/*
 * @Author: chencong 
 * @Date: 2018-04-22 14:52:17 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 16:32:41
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
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
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    }),
    // 将css文件单独打包到文件里面
    new ExtractTextPlugin("css/[name].css"),
    // html模块的处理
    new HtmlWebpackPlugin({
      template: "./src/view/index.html",
      filename: "view/index.html",
      inject: true,
      hash: true,
      chunks: ["common", "index"]
    })
  ]
};

module.exports = config;
