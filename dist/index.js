"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var AxiosRequestConfigAdapter_1 = require("./adapter/AxiosRequestConfigAdapter");
var IR2CurlOptions_1 = require("./interface/IR2CurlOptions");
var CommonUtils_1 = __importDefault(require("./lib/CommonUtils"));
var CurlBuilder_1 = require("./lib/CurlBuilder");
var log = debug_1.default('r2curl:index');
function r2curl(request, option) {
    if (option === void 0) { option = {}; }
    var mergedOption = __assign(__assign({}, IR2CurlOptions_1.defaultR2CurlOptions), option);
    CommonUtils_1.default.bootstrap(mergedOption);
    // judge request wrapper object type
    var adapter = (function () {
        if ((function (_request) { return 'config' in _request; })(request)) {
            // judge request is AxiosResponse
            return new AxiosRequestConfigAdapter_1.AxiosRequestConfigAdapter(request.config);
        }
        // judge request is AxiosRequestConfig
        return new AxiosRequestConfigAdapter_1.AxiosRequestConfigAdapter(request);
    })();
    var curl = new CurlBuilder_1.CurlBuilder(adapter, mergedOption).toString();
    log('cURL Command: ', curl);
    return curl;
}
exports.default = r2curl;
