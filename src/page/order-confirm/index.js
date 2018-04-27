/*
 * @Author: chencong
 * @Date: 2018-04-27 11:13:58
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-27 17:11:08
 */
require("./index.css");
require("page/common/header/index.js");
require("page/common/nav/index.js");
var _mm = require("util/mm.js");
var _order = require("service/order-service.js");
var _address = require("service/address-service.js");
var templateProduct = require("./product-list.string");
var templateAddress = require("./address-list.string");
var addressModal = require("./address-modal.js");

var page = {
    data: {
        selectedAddressId: null
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 加载地址列表
        this.loadAddressList();
        this.loadProductList();
        // 加商品列表
    },
    bindEvent: function() {
        var _this = this;
        // 地址选择
        $(document).on("click", ".address-item", function() {
            $(this)
                .addClass("active")
                .siblings(".address-item")
                .removeClass("active");
            _this.data.selectedAddressId = $(this).data('id');
        });

        // 订单的提交
        $(document).on("click", ".order-submit", function() {
           var shippingId = _this.data.selectedAddressId;
           if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                },function(res){
                    // 成功
                    window.location.href = './payment.html?orderNumber='+res.orderNo;
                },function(errMsg){
                    // 失败
                    _mm.errorTips(errMsg);
                });
           }else{
               _mm.errTips('请选择地址后再提交');
           }
        });

        // 地址的添加
        $(document).on('click','.address-add',function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    // 成功后重新加载地址列表
                    _this.loadAddressList();
                }
            });
        });
    },

    // 加载地址列表
    loadAddressList: function() {
        var _this = this;
        _address.getAddressList(
            function(res) {
                var addressHtml = _mm.renderHtml(templateAddress, res);
                $(".address-con").html(addressHtml);
            },
            function(errMsg) {
                $(".address-con").html(
                    '<p class="err-tip">地址加载失败！请重试</p>'
                );
            }
        );
    },
    // 加载商品清单
    loadProductList: function() {
        var _this = this;
        _order.getProductList(
            function(res) {
                var productHtml = _mm.renderHtml(templateProduct, res);
                $(".product-con").html(productHtml);
            },
            function(errMsg) {
                $(".product-con").html(
                    '<p class="err-tip">商品信息加载失败！请重试</p>'
                );
            }
        );
    }
};

$(function() {
    page.init();
});
