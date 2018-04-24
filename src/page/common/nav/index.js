/*
 * @Author: chencong
 * @Date: 2018-04-22 23:35:27
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-24 10:29:36
 */

require("./index.css");

var _mm = require("util/mm.js");
var _user = require("service/user-service.js");
var _cart = require("service/cart-service.js");

var nav = {
    // 初始化信息
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        // 链式调用 需要添加return this
        return this;
    },
    // 事件绑定
    bindEvent: function() {
        // 绑定登录点击事件
        $(".js-login").click(function() {
            _mm.doLogin();
        });
        // 绑定注册点击事件
        $(".js-register").click(function() {
            window.location.href = "./user-register.html";
        });
        // 退出点击事件
        $(".js-logout").click(function() {
            _user.logout(
                function(res) {
                    // 处理成功
                    window.location.reload();
                },
                function(errMsg) {
                    // 处理失败
                    //_mm.errorTips(errMsg);
                }
            );
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        _user.checkLogin(
            function(res) {
                // 处理成功,已经登录，将没有登录隐藏
                $(".user.not-login")
                    .hide()
                    .siblings(".user.login")
                    .show()
                    .find(".username")
                    .text(res.username);
            },
            function(errMsg) {
                // 处理失败 do nothing
                //_mm.errorTips(errMsg);
            }
        );
    },
    // 加载购物车数量
    loadCartCount: function() {
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        },function(errMsg){
            // do nothing 初测回复默认0
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();
