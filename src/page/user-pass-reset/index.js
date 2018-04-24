/*
 * @Author: chencong
 * @Date: 2018-04-22 14:55:40
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-24 19:01:48
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

// 处理登录时候的业务
var page = {
    data: {
        username: "",
        question: "",
        answer: "",
        token: ""
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    // 显示第一步
    onLoad: function() {
        // 显示用户名
        this.loadStepUsername();
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this;
        // 输入用户名 下一步按钮点击
        $("#submit-username").click(function() {
            var username = $.trim($("#username").val());
            if (username) {
                _user.getQuestion(
                    username,
                    function(res) {
                        _this.data.username = username;
                        _this.data.question = res;
                        _this.loadStepQuestion();
                    },
                    function(errMsg) {
                        formError.show(errMsg);
                    }
                );
            } else {
                // 用户名不存在
                formError.show("请输入用户名");
            }
        });
        // 输入密码提示问题按钮的点击
        $("#submit-question").click(function() {
            var answer = $.trim($("#answer").val());
            // 密码提示问题答案存在
            if (answer) {
                _user.checkAnswer(
                    {
                        username: _this.data.username,
                        question: _this.data.question,
                        answer: answer
                    },
                    function(res) {
                        _this.data.answer = answer;
                        _this.data.token = res;
                        _this.loadStepPassword();
                    },
                    function(errMsg) {
                        formError.show(errMsg);
                    }
                );
            } else {
                // 用户名不存在
                formError.show("请输入密码提示问题答案");
            }
        });
        // 输入新密码后的按钮点击
        $("#submit-password").click(function() {
            var password = $.trim($("#password").val());
            // 密码是否为空
            if (password && password.length >= 6) {
                _user.resetPassword(
                    {
                        username: _this.data.username,
                        passwordNew: password,
                        forgetToken: _this.data.token
                    },
                    function(res) {
                        window.location.href = "./result.html?type=pass-reset";
                    },
                    function(errMsg) {
                        formError.show(errMsg);
                    }
                );
            } else {
                // 密码为空
                formError.show("请输入不少于6位新密码");
            }
        });
    },
    // 第一步加载用户名
    loadStepUsername: function() {
        $(".step-username").show();
    },
    // 加载输入密码提示答案
    loadStepQuestion: function() {
        // 清除错误提示
        formError.hide();
        // 做容器切换
        $(".step-username")
            .hide()
            .siblings(".step-question")
            .show()
            .find(".question")
            .text(this.data.question);
    },
    // 加载输入password
    loadStepPassword: function() {
        // 清除错误提示
        formError.hide();
        // 做容器切换
        $(".step-question")
            .hide()
            .siblings(".step-password")
            .show();
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
            _user.login(
                formData,
                function(res) {
                    // 成功
                    window.location.href =
                        _mm.getUrlParam("redirect") || "./index.html";
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
