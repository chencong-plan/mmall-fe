/*
 * @Author: chencong 
 * @Date: 2018-04-22 19:03:44 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 19:50:51
 * 通用工具类
 */

/**
 * 配置文件
 */
var conf = {
  serverHost: ""
};

var __mm = {
  /**
   * 统一网络请求
   */
  request: function(param) {
    //   因为在ajax当中无法访问this对象，因此在这定义一下
    var __this = this;
    $.ajax({
      type: param.method || "get",
      url: param.url || "",
      dataType: param.type || "json",
      data: param.data || "",
      success: function(res) {
        //   请求成功
        if (0 === res.status) {
          typeof param.success === "function" &&
            param.success(res.data, res.msg);
        }
        //   没有登录状态，需要强制登录
        else if (10 === res.status) {
          // 登录
          __this.doLogin();
        }
        // 请求的数据错误
        else if (10 === res.status) {
          typeof param.error === "function" && param.error(res.msg);
        }
      },
      error: function(error) {
        typeof param.error === "function" && param.error(error.statusText);
      }
    });
  },
  /**
   * 获取服务器地址
   * 可以更换请求地址，
   * 可以统计请求次数
   */
  getSergerUrl: function(path) {
    return conf.serverHost + path;
  },
  /**
   * 获取url参数
   * eg:happymmall.com/product/list.do?keyword=1&page=1
   * 提取出keyword=1&page=1
   * 使用正则表达式
   */
  getUrlParam: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  /**
   * 统一登录处理
   */
  doLogin: function() {
    window.location.href =
      "./login.html?redirect=" + encodeURIComponent(window.location.href);
  }
};

module.exports = __mm;
