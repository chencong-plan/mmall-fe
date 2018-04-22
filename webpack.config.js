/*
 * @Author: chencong 
 * @Date: 2018-04-22 14:52:17 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 17:10:06
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 封装函数，不同页面设置不同的HtmlWebpackPlugin，避免大量重复代码
 * 获取html-webpack-plugin参数的方法
 * @param {*name} name
 */
var getHtmlConfig = function(name) {
  return {
    template: "./src/view/" + name + ".html",
    filename: "view/" + name + ".html",
    inject: true,
    hash: true,
    chunks: ["common", name]
  };
};

/**
 * webpack-config
 */
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
      // 处理css style的loader
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      // 处理img的loader,限制大小，小于为base64 大于为图片路径
      // 添加limit=100&name=resource/[name].[ext]参数：限制大小为100，同时图片名称为原始名称，而不用哈希
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=100&name=resource/[name].[ext]"
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
    new HtmlWebpackPlugin(getHtmlConfig("index")),
    new HtmlWebpackPlugin(getHtmlConfig("login"))
  ]
};

module.exports = config;
