/*
 * @Author: chencong
 * @Date: 2018-04-24 22:09:46
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-25 10:09:15
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var navSide = require("page/common/nav-side/index.js");
var _mm = require("util/mm.js");
var _user = require("service/user-service.js");

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
            name: "user-pass-update"
        });
    },
    bindEvent: function() {
        var _this = this;
        // 事件冒泡
        $(document).on("click", ".btn-submit", function() {
            var userInfo = {
                    password: $.trim($("#password").val()),
                    passwordNew: $.trim($("#password-new").val()),
                    passwordConfirm: $.trim($("#password-confirm").val())
                },
                validateResult = _this.validateForm(userInfo);
                console.log(userInfo);
            if (validateResult.status) {
                _user.updatePassword(
                    {
                        passwordOld: userInfo.password,
                        passwordNew: userInfo.passwordNew
                    },
                    function(res, msg) {
                        // 更改成功用户个人信息
                        _mm.successTips(msg);
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
    // 验证字段信息
    validateForm: function(formData) {
        // 用户名 密码验证
        var result = {
            status: false,
            msg: ""
        };
        // 原密码是否为空
        if (!_mm.validate(formData.password, "require")) {
            result.msg = "原密码不能为空";
            return result;
        }
        // 新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = "密码长度不能小于6位";
            return result;
        }
        // 验证两次密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = "两次密码不一致";
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
