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
var CURL_OPTIONS_1 = require("../enum/CURL_OPTIONS");
var HTTP_HEADER_1 = require("../enum/HTTP_HEADER");
var HTTP_METHOD_1 = require("../enum/HTTP_METHOD");
var isEmpty_1 = require("./isEmpty");
var log = debug_1.default('r2curl:HeaderHelper');
var HeaderHelper = /** @class */ (function () {
    function HeaderHelper(_rawHeaders, _method, _curlOptionContainer, _option) {
        var _this = this;
        this._rawHeaders = _rawHeaders;
        this._method = _method;
        this._curlOptionContainer = _curlOptionContainer;
        this._option = _option;
        this.defaultContentType = _option.defaultContentType === false ? null : _option.defaultContentType;
        this.keys = [];
        this.pairs = {};
        Object.keys(_rawHeaders).forEach(function (key) {
            var lower = key.toLowerCase();
            _this.pairs[lower] = _rawHeaders[key];
            _this.keys.push(lower);
        });
        this.headers = this.parseHeader();
        log('keys', this.keys);
    }
    HeaderHelper.prototype.toObject = function () {
        if (isEmpty_1.isEmpty(this.headers)) {
            return {};
        }
        return this.headers;
    };
    HeaderHelper.prototype.parseHeader = function () {
        if (isEmpty_1.isEmpty(this._rawHeaders) && isEmpty_1.isEmpty(this.defaultContentType)) {
            return null;
        }
        this.judgeAcceptEncoding();
        return __assign(__assign({}, this.parseContentHeader()), this._rawHeaders);
    };
    HeaderHelper.prototype.parseContentHeader = function () {
        log('_rawHeaders', this._rawHeaders);
        log('defaultContentType', this.defaultContentType);
        var rawHeaderContentType = this.keys.find(function (key) { return key === HTTP_HEADER_1.HTTP_HEADER_LOWERCASE.CONTENT_TYPE; });
        var isNeedContentType = [
            HTTP_METHOD_1.HTTP_METHOD.POST,
            HTTP_METHOD_1.HTTP_METHOD.PUT,
            HTTP_METHOD_1.HTTP_METHOD.PATCH,
        ].includes(this._method) || this._option.forceBody;
        log('isNeedContentType', [
            HTTP_METHOD_1.HTTP_METHOD.POST,
            HTTP_METHOD_1.HTTP_METHOD.PUT,
            HTTP_METHOD_1.HTTP_METHOD.PATCH,
        ].includes(this._method), this._option.forceBody, 'OR CALC', isNeedContentType);
        var headers = {};
        if (isNeedContentType && isEmpty_1.isEmpty(rawHeaderContentType) && isEmpty_1.isNotEmpty(this.defaultContentType)) {
            headers[HTTP_HEADER_1.HTTP_HEADER.CONTENT_TYPE] = this.defaultContentType;
        }
        return headers;
    };
    HeaderHelper.prototype.judgeAcceptEncoding = function () {
        var rawHeaderAcceptEncoding = this.keys.find(function (key) { return key === HTTP_HEADER_1.HTTP_HEADER_LOWERCASE.ACCEPT_ENCODING; });
        log('rawHeaderAcceptEncoding:', rawHeaderAcceptEncoding);
        log('this.paris[rawHeaderAcceptEncoding]:', isEmpty_1.isNotEmpty(rawHeaderAcceptEncoding) ? this.pairs[rawHeaderAcceptEncoding] : null);
        if (isEmpty_1.isNotEmpty(rawHeaderAcceptEncoding) && this.pairs[rawHeaderAcceptEncoding] === 'gzip') {
            this._curlOptionContainer.add(CURL_OPTIONS_1.CURL_OPTIONS.COMPRESSED);
        }
        return;
    };
    return HeaderHelper;
}());
exports.HeaderHelper = HeaderHelper;
