/*
 * @Author: chencong
 * @Date: 2018-04-23 09:52:01
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 10:22:16
 * header index.js
 */
require("./index.css");

var _mm = require("util/mm.js");

// 通用页面头部
var header = {
    init: function() {
        this.bindEvent();

        return this;
    },
    // 加载时候获取参数
    onLoad: function() {
        var keyword = _mm.getUrlParam("keyword");
        // keyword存在 回填
        if (keyword) {
            $("#search-input").val(keyword);
        }
    },
    bindEvent: function() {
        // 绑定事件,点击提交表单
        var _this = this;
        // 点击搜索按钮后搜索提交
        $("#search-btn").click(function() {
            _this.searchSubmit();
        });
        // 输入回车后 搜索提交
        $("#search-input").keyup(function(e) {
            // 13是回车键
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit: function() {
        // 取到输入框keyword
        var keyword = $.trim($("#search-input").val());
        if (keyword) {
            // keyword正常提交 跳转到list页面
            window.location.href = "./list.html?keyword=" + keyword;
        } else {
            // 如果keyword不存在 跳转到shouye
            _mm.getHome();
        }
    }
};
// 不需要输出
//module.exports = header.init();

header.init();
