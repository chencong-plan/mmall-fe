/*
 * @Author: chencong
 * @Date: 2018-04-22 23:35:27
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-28 11:21:17
 */

require("./index.css");

var _mm = require("util/mm.js");
var templateIndex = require("./index.string");

// 侧边导航
var navSide = {
    option: {
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
                name: "user-pass-update",
                desc: "修改密码",
                href: "./user-pass-update.html"
            },
            {
                name: "about",
                desc: "关于cmall",
                href: "./about.html"
            }
        ]
    },
    // 初始化信息
    init: function(option) {
        // 合并选项
        // 将第一个对象的值改变成第二个对象值，如果不改变可以在前面添加一个{}对象
        //  $.extend({},this.optiopn,optiopn);
        $.extend(this.option, option);
        // 渲染导航菜单
        this.renderNav();
        // 链式调用 需要添加return this
        // return this;
    },
    // 渲染导航菜单
    renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
                // console.log(this.option.navList[i].name + ':' + this.option.navList[i].isActive);
            }
        };
        // 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 将html放入容器当中
        // console.log(navHtml);
        $(".nav-side").html(navHtml);
    }
};

module.exports = navSide;
