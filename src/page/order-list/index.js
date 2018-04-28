/*
 * @Author: chencong
 * @Date: 2018-04-28 10:41:55
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-28 11:28:45
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var navSide = require("page/common/nav-side/index.js");
var Pagination = require("util/pagination/index.js");
var _mm = require("util/mm.js");
var _order = require("service/order-service.js");
var templateIndex = require("./index.string");

// page 逻辑部分
var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 2
        }
    },
    init: function() {
        this.onLoad();
    },
    // 绑定事件
    onLoad: function() {
        this.loadOrderList();
        // 这是初始化左侧菜单
        navSide.init({
            name: "order-list"
        });

    },
    // 加载订单列表
    loadOrderList: function() {
        var orderListHtml = "";
        var _this = this;
        var $listCon = $(".order-list-con");
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(
            this.data.listParam,
            function(res) {
                _this.dataFilter(res);
                // 这是渲染html
                orderListHtml = _mm.renderHtml(templateIndex, res);
                $listCon.html(orderListHtml);
                // 加载订单分页信息
                _this.loadPagination({
                    hasPreviousPage: res.hasPreviousPage,
                    prePage: res.prePage,
                    hasNextPage: res.hasNextPage,
                    nextPage: res.nextPage,
                    pageNum: res.pageNum,
                    pages: res.pages
                });
            },
            function(errMsg) {
                $listCon.html(
                    '<p class="err-tip">加载订单失败~ 请刷新后重试</p>'
                );
            }
        );
    },
    // 加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? "" : (this.pagination = new Pagination());
        this.pagination.render(
            $.extend({}, pageInfo, {
                container: $(".pagination"),
                onSelectPage: function(pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadOrderList();
                }
            })
        );
    },
    // 数据适配
    dataFilter: function(data) {
        data.isEmpty = !data.list.length;
    }
};
// 页面加载时候处理业务
$(function() {
    page.init();
});
