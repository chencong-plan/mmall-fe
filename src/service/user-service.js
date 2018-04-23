/*
 * @Author: chencong
 * @Date: 2018-04-23 09:08:58
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-23 09:23:28
 * 用户调用后端代码
 */
var _mm = require("util/mm.js");
var _user = {
    // 登出
    logout: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/user/logout.do"),
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/user/get_user_info.do"),
            method: "POST",
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;
