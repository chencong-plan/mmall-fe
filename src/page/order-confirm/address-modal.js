/*
 * @Author: chencong
 * @Date: 2018-04-27 17:04:32
 * @Last Modified by: chencong
 * @Last Modified time: 2018-04-27 18:34:35
 */
var _mm = require("util/mm.js");
var _address = require("service/address-service.js");
var templateAddressModal = require("./address-modal.string");
var _cities = require("util/cities/index.js");

var addressModal = {
    show: function(option) {
        this.option = option;
        this.$modalWrap = $(".modal-wrap");
        // 渲染modal当中HTML
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 省份和城市的二级联动
        this.$modalWrap.find("#receiver-province").change(function() {
            // 加载city
            var selectedProvince = $(this).val();
            // console.log(selectedProvince);
            _this.loadCities(selectedProvince);
        });
        // 提交收货地址
        this.$modalWrap.find(".address-btn").click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            if (!isUpdate && receiverInfo.status) {
                //使用新地址 并且所有数据通过校验
                _address.save(
                    receiverInfo.data,
                    function(res) {
                        _mm.successTips("地址添加成功");
                        _this.hide();
                        typeof _this.option.onSuccess === "function" &&
                            _this.option.onSuccess(res);
                    },
                    function(errMsg) {
                        _mm.errorTips("地址添加失败");
                    }
                );
            } else if (isUpdate && receiverInfo.status) {
                // 更新收件地址，所有数据通过校验
            } else {
                // 验证不通过
                _mm.errorTips(receiverInfo.errMsg || "好像哪里不对了！");
            }
        });

        // 保证点击modal内容区无关闭弹窗
        // 在modal-container这里将事件冒泡在此阻止
        this.$modalWrap.find(".modal-container").click(function(e) {
            e.stopPropagation();
        });
        // 点击叉叉或者蒙版区间关闭弹窗
        this.$modalWrap.find(".close").click(function() {
            _this.hide();
        });
    },

    loadModal: function() {
        var addressModalHtml = _mm.renderHtml(
            templateAddressModal,
            this.option.data
        );
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
        // 加载城市
        this.loadCities();
    },
    // 加载省份
    loadProvince: function() {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find("#receiver-province");
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    // 加载城市
    loadCities: function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find("#receiver-city");
        $citySelect.html(this.getSelectOption(cities));
    },
    // 获取表单里面收件人信息 并且做表达的验证
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(
            this.$modalWrap.find("#receiver-name").val()
        );
        receiverInfo.receiverProvince = $.trim(
            this.$modalWrap.find("#receiver-province").val()
        );
        receiverInfo.receiverCity = $.trim(
            this.$modalWrap.find("#receiver-city").val()
        );
        receiverInfo.receiverAddress = $.trim(
            this.$modalWrap.find("#receiver-address").val()
        );
        receiverInfo.receiverPhone = $.trim(
            this.$modalWrap.find("#receiver-phone").val()
        );
        receiverInfo.receiverZip = $.trim(
            this.$modalWrap.find("#receiver-zip").val()
        );
        // console.log(receiverInfo);
        if (!receiverInfo.receiverName) {
            result.errMsg = "请输入收件人姓名";
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = "请选择收件人所在省份";
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = "请选择收件人所在城市";
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = "请输入详细收件地址";
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = "请输入收件人手机号";
        } else {
            // 所有验证都通过了
            result.status = true;
            result.data = receiverInfo;
        }
        console.log(result);
        return result;
    },
    // 获取select框的选项，输入的是一个数组，输出是HTML
    getSelectOption: function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html +=
                '<option value="' +
                optionArray[i] +
                '">' +
                optionArray[i] +
                "</option>";
        }
        return html;
    },

    // 关闭弹窗
    hide: function() {
        this.$modalWrap.empty();
    }
};

module.exports = addressModal;
