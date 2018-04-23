/*
 * @Author: chencong
 * @Date: 2018-04-22 19:03:44
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 10:25:13
 * 通用工具类
 */

/**
 * 引入打包插件
 */
var Hogan = require("hogan.js");

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
                typeof param.error === "function" &&
                    param.error(error.statusText);
            }
        });
    },
    /**
     * 获取服务器地址
     * 可以更换请求地址，
     * 可以统计请求次数
     */
    getServerUrl: function(path) {
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
     * 渲染HTML模板,
     * hogan先编译后渲染
     */
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    /**
     * 成功提示
     */
    successTips: function(msg) {
        alert(msg || "操作成功");
        console.log(msg || "操作成功");
    },
    /**
     * 错误提示
     */
    errorTips: function(msg) {
        alert(msg || "哪里不对了~");
        console.log(msg || "哪里不对了~");
    },
    /**
     * 字段的验证，支持非空，手机，邮箱的判断
     * value:将要验证的字符串
     * type：验证的类型，是否为空，是否为手机号，是否为邮箱
     */
    validate: function(value, type) {
        var value = $.trim(value);
        //非空验证
        if ("require" === type) {
            return !!value;
        }
        //手机号验证
        if ("phone" === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if ("email" === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

    /**
     * 统一登录处理
     */
    doLogin: function() {
        window.location.href =
            "./login.html?redirect=" + encodeURIComponent(window.location.href);
    },
    /**
     * 跳转回首页
     */
    goHome: function() {
        window.location.href = "./index.html";
    }
};

module.exports = __mm;
