/*
 * @Author: chencong
 * @Date: 2018-04-24 22:09:46
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-24 23:38:07
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var navSide = require("page/common/nav-side/index.js");
var _mm = require("util/mm.js");
var _user = require("service/user-service.js");
var templateIndex = require("./index.string");

// page 逻辑部分
var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    // 绑定事件
    onLoad: function() {
        // 这是初始化左侧菜单
        navSide.init({
            name: "user-center"
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function() {
        var _this = this;
        // 事件冒泡
        $(document).on("click", ".btn-submit", function() {
            var userInfo = {
                    phone: $.trim($("#phone").val()),
                    email: $.trim($("#email").val()),
                    question: $.trim($("#question").val()),
                    answer: $.trim($("#answer").val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(
                    userInfo,
                    function(res, msg) {
                        // 更改成功用户个人信息
                        _mm.successTips(msg);
                        window.location.href = "./user-center.html";
                    },
                    function(errMsg) {
                        // 失败的回调
                        _mm.errorTips(validateResult.msg);
                    }
                );
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = "";
        _user.getUserInfo(
            function(res) {
                userHtml = _mm.renderHtml(templateIndex, res);
                $(".panel-body").html(userHtml);
            },
            function(errMsg) {
                _mm.errTips(errMsg);
            }
        );
    },
    // 验证字段信息
    validateForm: function(formData) {
        // 用户名 密码验证
        var result = {
            status: false,
            msg: ""
        };
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
