"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEmpty_1 = require("./isEmpty");
var CommonUtils = /** @class */ (function () {
    function CommonUtils() {
    }
    CommonUtils.bootstrap = function (options) {
        this.quote = options.quote === 'single' ? '\'' : '"';
    };
    CommonUtils.wrapQuote = function (content, params) {
        if (isEmpty_1.isEmpty(this.quote)) {
            throw new Error('CommonUtils not Bootstraped');
        }
        return "" + this.quote + content + (params ? "?" + params : '') + this.quote;
    };
    return CommonUtils;
}());
exports.default = CommonUtils;
