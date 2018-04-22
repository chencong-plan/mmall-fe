/*
 * @Author: chencong 
 * @Date: 2018-04-22 14:56:07 
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-22 19:55:54
 */

var _mm = require("util/mm.js");

/**
 * 测试封装的request请求
 */
// _mm.request({
//     url:'/product/list.do?keyword=1',
//     success : function(res){
//         console.log(res);
//     },
//     error: function(errMsg){
//         console.log(errMsg);
//     }
// });

/**
 * js工具类封装测试
 */
console.log(_mm.getUrlParam('test'));
