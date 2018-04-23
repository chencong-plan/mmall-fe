/*
 * @Author: chencong
 * @Date: 2018-04-22 23:35:27
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 11:11:24
 */

require("./index.css");

var _mm = require("util/mm.js");
var templateIndex = require("./index.string");

// 侧边导航
var nav = {
    optiopn: {
        name: "",
        navList: [
            {
                name: "user-center",
                desc: "个人中心",
                href: "./user-center.html"
            },
            {
                name: "order-list",
                desc: "我的订单",
                href: "./order-list.html"
            },
            {
                name: "pass-update",
                desc: "修改密码",
                href: "./pass-update.html"
            },
            {
                name: "about",
                desc: "关于cmall",
                href: "./about.html"
            }
        ]
    },
    // 初始化信息
    init: function(optiopn) {
        // 合并选项
        // 将第一个对象的值改变成第二个对象值，如果不改变可以在前面添加一个{}对象
        //  $.extend({},this.optiopn,optiopn);
        $.extend(this.optiopn, optiopn);
        // 渲染导航菜单
        this.renderNav();
        // 链式调用 需要添加return this
        // return this;
    },
    // 渲染导航菜单
    renderNav: function() {
        //计算avtive数据
        var iLength = this.optiopn.navList.length;
        for (var i = 0; i < iLength; i++) {
            if (this.optiopn.navList[i].name === this.optiopn.name) {
                this.optiopn.navList[i].isActive = true;
            }
        }
        // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.optiopn.navList
        });
        // 将html放入容器当中
        $(".nav-side").html(navHtml);
    }
};

module.exports = nav;
