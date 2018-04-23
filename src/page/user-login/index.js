/*
 * @Author: chencong
 * @Date: 2018-04-22 14:55:40
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 20:32:34
 */

require("./index.css");
require("page/common/nav-simple/index.js");
var _user = require('service/user-service.js');
var _mm = require("util/mm.js");


// 表单错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').show().find('.err-msg').text('');
    }
};

// 处理登录时候的业务
var page = {
    init: function() {
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this;
        // 登录按钮的点击
        $("#submit").click(function() {
            _this.submit();
        });
        // 如果按下回车也进行提交
        $(".user-content").keyup(function(e) {
            // keyCode === 13 表述回车
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    // 提交表单
    submit: function() {
        var formData = {
                username: $.trim($("#username").val()),
                password: $.trim($("#password").val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 验证成功，提交
            _user.login(formData,function(res){
                // 成功
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                // 失败
                formError.show(errMsg);
            });
        } else {
            // 验证失败，错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单验证，字段验证
    formValidate: function(formData) {
        // 用户名 密码验证
        var result = {
            status: false,
            msg: ""
        };
        // 密码不能为空
        if (!_mm.validate(formData.username, "require")) {
            result.msg = "用户名不能为空";
            return result;
        }
        // password不能为空
        if (!_mm.validate(formData.password, "require")) {
            result.msg = "密码不能为空";
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};

// 页面加载时候处理业务
$(function() {
    page.init();
});
