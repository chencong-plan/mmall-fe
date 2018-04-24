/*
 * @Author: chencong
 * @Date: 2018-04-24 09:42:32
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-24 18:38:44
 */

require("./index.css");
require("page/common/nav-simple/index.js");
var _user = require("service/user-service.js");
var _mm = require("util/mm.js");

// 表单错误提示
var formError = {
    show: function(errMsg) {
        $(".error-item")
            .show()
            .find(".err-msg")
            .text(errMsg);
    },
    hide: function() {
        $(".error-item")
            .hide()
            .find(".err-msg")
            .text("");
    }
};

// 处理注册时候的业务
var page = {
    init: function() {
        this.bindEvent();
    },
    // 提交表单
    submit: function() {
        var formData = {
                username: $.trim($("#username").val()),
                password: $.trim($("#password").val()),
                passwordConfirm: $.trim($("#passwordConfirm").val()),
                phone: $.trim($("#phone").val()),
                email: $.trim($("#email").val()),
                question: $.trim($("#question").val()),
                answer: $.trim($("#answer").val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 验证成功，提交
            _user.register(
                formData,
                function(res) {
                    // 成功
                    window.location.href = "./result.html?type=register";
                },
                function(errMsg) {
                    // 失败
                    formError.show(errMsg);
                }
            );
        } else {
            // 验证失败，错误提示
            formError.show(validateResult.msg);
        }
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this;
        // 验证用户名
        $("#username").blur(function() {
            var username = $.trim($(this).val());
            // 如果用户名为空，则不做验证
            if (!username) {
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(
                username,
                function(res) {
                    formError.hide();
                },
                function(errMsg) {
                    formError.show(errMsg);
                }
            );
        });
        // 注册按钮的点击
        $("#submit").click(function() {
            console.log(_this.formData);
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
        // 密码长度不能小于6位
        if (formData.password.length < 6) {
            result.msg = "密码长度不能小于6位";
            return result;
        }
        // 验证两次密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = "两次密码不一致";
            return result;
        }
        // 验证手机号
        if (!_mm.validate(formData.phone, "phone")) {
            result.msg = "手机号格式错误";
            return result;
        }
        // 邮箱
        if (!_mm.validate(formData.email, "email")) {
            result.msg = "邮箱格式错误";
            return result;
        }
        // 密码提示问题
        if (!_mm.validate(formData.question, "require")) {
            result.msg = "问题不能为空";
            return result;
        }
        // 密码提示问题答案
        if (!_mm.validate(formData.answer, "require")) {
            result.msg = "答案不能为空";
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
