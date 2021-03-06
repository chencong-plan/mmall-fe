/*
 * @Author: chencong
 * @Date: 2018-04-25 21:55:26
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-27 16:17:03
 */
/*
 * @Author: chencong
 * @Date: 2018-04-23 09:08:58
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-25 10:02:51
 * 用户调用后端代码
 */
var _mm = require("util/mm.js");
var _product = {
    // 获取商品list
    getProductList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/product/list.do"),
            data: listParam,
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    // 获取商品详情
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/product/detail.do"),
            data: {
                productId: productId
            },
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    // 获取商品品论信息
    getProductComment: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl(""),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;
