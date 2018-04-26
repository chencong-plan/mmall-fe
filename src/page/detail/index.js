/*
 * @Author: chencong
 * @Date: 2018-04-26 10:46:24
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-26 16:48:26
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var _mm = require("util/mm.js");
var _product = require("service/product-service.js");
var _cart = require("service/cart-service.js");
var templateIndex = require("./index.string");

var page = {
    data: {
        productId: _mm.getUrlParam("productId") || ""
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 如果没有传productId, 自动跳回首页
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function() {
        // 事件代理 图片预览
        var _this = this;
        $(document).on("mouseenter", ".p-img-item", function() {
            var imageUrl = $(this)
                .find(".p-img")
                .attr("src");
            $(".main-img").attr("src", imageUrl);
        });
        // count的操作
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click','.cart-add',function(){
            _cart.addToCart({
                productId : _this.data.productId,
                count : $('.p-count').val()
            },function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    loadDetail: function() {
        var html = "";
        var _this = this;
        $pageWrap = $(".page-wrap");
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求数据接口
        _product.getProductDetail(
            this.data.productId,
            function(res) {
                _this.filter(res);
                // 缓存住html的内容
                _this.data.detailInfo = res;
                html = _mm.renderHtml(templateIndex, res);
                $(".page-wrap").html(html);
            },
            function(errMsg) {
                $(".page-wrap").html(
                    '<p class="err-tip">此商品太淘气，找不到额</p>'
                );
            }
        );
    },
    // js引用类型
    filter: function(data) {
        data.subImages = data.subImages.split(",");
    }
};
$(function() {
    page.init();
});
