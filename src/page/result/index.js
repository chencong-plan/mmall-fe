/*
 * @Author: chencong
 * @Date: 2018-04-23 18:34:21
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 18:48:12
 * 操作结果提示
 */

require("./index.css");
require("page/common/nav-simple/index.js");
var _mm = require("util/mm.js");

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.'+type + '-success');
    // 显示对应的提示文字
    $element.show();

    // 这里还可以显示订单信息
});
