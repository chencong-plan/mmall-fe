/*
 * @Author: chencong
 * @Date: 2018-04-25 21:54:34
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-25 22:19:52
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var _mm = require("util/mm.js");
var _product = require("service/product-service.js");
var templateIndex = require("./index.string");

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam("keyword") || "",
            categoryId: _mm.getUrlParam("categoryId") || "",
            orderBy: _mm.getUrlParam("orderBy") || "desc",
            pageNum: _mm.getUrlParam("pageNum") || 1,
            pageSize: _mm.getUrlParam("pageSize") || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();
    },
    // 绑定数据
    bindEvent: function() {},
    //加载list数据
    loadList: function() {
        var listParam = this.data.listParam;
        var listHtml = "";
        var _this = this;
        _product.getProductList(
            listParam,
            function(res) {
                // 请求成功，开始渲染
                listHtml = _mm.renderHtml(templateIndex,{
                    list : res.list
                });
                // 填充渲染之后的html
                $('.p-list.con').html(listHtml);
                // 加载分页信息
                _this.loadPagination(res.pageNum,res.pages);
            },
            function(errMsg) {
                _mm.errorTips(errMsg);
            }
        );
    },
    // 加载分页信息
    loadPagination : function(pageNum,pages){

    }
};

$(function() {
    page.init();
});
