/*
 * @Author: chencong
 * @Date: 2018-04-27 11:13:58
 * @Last Modified by: chencong
 * @Last Modified time: 2018-05-26 13:38:51
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
            _this.data.selectedAddressId = $(this).data("id");
        });

        // 订单的提交
        $(document).on("click", ".order-submit", function() {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder(
                    {
                        shippingId: shippingId
                    },
                    function(res) {
                        // 成功
                        window.location.href =
                            "./payment.html?orderNumber=" + res.orderNo;
                    },
                    function(errMsg) {
                        // 失败
                        _mm.errorTips(errMsg);
                    }
                );
            } else {
                _mm.errTips("请选择地址后再提交");
            }
        });

        // 地址的添加 加载地图插件
        $(document).on("click", ".address-add", function() {
            addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    // 成功后重新加载地址列表
                    _this.loadAddressList();
                }
            });
             /**
             * 加载地图
             */
            addressModal.initMap();
        });
        // 地址编辑 加载地图插件
        $(document).on("click", ".address-update", function(e) {
            e.stopPropagation();
            var shippingId = $(this)
                .parents(".address-item")
                .data("id");
            _address.getAddress(
                shippingId,
                function(res) {
                    addressModal.show({
                        isUpdate: true,
                        data: res,
                        onSuccess: function() {
                            // 成功后重新加载地址列表
                            _this.loadAddressList();
                        }
                    });
                },
                function(errMsg) {
                    _mm.errorTips(errMsg);
                }
            );
        });

        // 地址的删除
        $(document).on("click", ".address-delete", function(e) {
            e.stopPropagation();
            var id = $(this)
                .parents(".address-item")
                .data("id");
            if (window.confirm("确认要删除改地址吗?")) {
                _address.deleteAddress(
                    id,
                    function(res) {
                        _this.loadAddressList();
                    },
                    function(errMsg) {
                        _mm.errorTips(errMsg);
                    }
                );
            }
        });
    },

    // 加载地址列表
    loadAddressList: function() {
        /**
         * 加载地图
         */
        addressModal.initMap();

        var _this = this;
        $(".address-con").html('<div class="loading"></div>');
        _address.getAddressList(
            function(res) {
                _this.addressFilter(res);
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
    // 处理地址列表中选中列表
    addressFilter: function(data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    // 这个元素即是被选中
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // 如果以前选中的地址不在列表当中，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品清单
    loadProductList: function() {
        var _this = this;
        // 加载图标
        $(".product-con").html('<div class="loading"></div>');
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
