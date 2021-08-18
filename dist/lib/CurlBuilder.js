"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var HTTP_METHOD_1 = require("../enum/HTTP_METHOD");
var BodyHelper_1 = require("./BodyHelper");
var CommonUtils_1 = __importDefault(require("./CommonUtils"));
var HeaderHelper_1 = require("./HeaderHelper");
var isEmpty_1 = require("./isEmpty");
var OptionContainer_1 = require("./OptionContainer");
var log = debug_1.default('r2curl:CurlBuilder');
var CurlBuilder = /** @class */ (function () {
    function CurlBuilder(_adap, _option) {
        this._adap = _adap;
        this._option = _option;
        this.optionContainer = new OptionContainer_1.OptionContainer();
    }
    Object.defineProperty(CurlBuilder.prototype, "method", {
        get: function () {
            if (isEmpty_1.isEmpty(this._adap.method)) {
                return '';
            }
            return "-X " + this._adap.method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurlBuilder.prototype, "headers", {
        get: function () {
            var helper = new HeaderHelper_1.HeaderHelper(this._adap.headers, this._adap.method, this.optionContainer, this._option);
            var headers = helper.toObject();
            if (isEmpty_1.isEmpty(headers)) {
                return '';
            }
            return Object.entries(headers)
                .map(function (header) { return "-H " + CommonUtils_1.default.wrapQuote(header[0] + ":" + header[1]); })
                .join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurlBuilder.prototype, "body", {
        get: function () {
            log("method: " + this._adap.method, "forceBody: " + this._option.forceBody, this._adap.body);
            if (!this._option.forceBody && [HTTP_METHOD_1.HTTP_METHOD.GET, HTTP_METHOD_1.HTTP_METHOD.DELETE].includes(this._adap.method)) {
                return '';
            }
            var helper = new BodyHelper_1.BodyHelper(this._adap.headers, this._adap.body);
            var body = helper.toString();
            if (isEmpty_1.isEmpty(body)) {
                return '';
            }
            return "--data " + CommonUtils_1.default.wrapQuote(helper.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurlBuilder.prototype, "url", {
        get: function () {
            return CommonUtils_1.default.wrapQuote(this._adap.url, this._adap.params);
        },
        enumerable: true,
        configurable: true
    });
    CurlBuilder.prototype.toString = function () {
        var existData = [this.method, this.url, this.headers, this.body].filter(function (data) { return !isEmpty_1.isEmpty(data); });
        var curlOptions = this.optionContainer.toString();
        return ("curl " + [existData.join(' '), curlOptions].filter(function (data) { return isEmpty_1.isNotEmpty(data); }).join(' ')).trim();
    };
    return CurlBuilder;
}());
exports.CurlBuilder = CurlBuilder;
