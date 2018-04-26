/*
 * @Author: chencong
 * @Date: 2018-04-23 09:26:22
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-26 16:46:05
 * 购物车操作
 */

var _mm = require("util/mm.js");
var _cart = {
    //获取购物车数量
    getCartCount: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/get_cart_product_count.do"),
            method: "GET",
            success: resolve,
            error: reject
        });
    },
    // 添加到购物车
    addToCart:function(productInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl("/cart/add.do"),
            data:productInfo,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;
