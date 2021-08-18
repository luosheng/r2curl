"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_METHOD_1 = require("../enum/HTTP_METHOD");
var isEmpty_1 = require("../lib/isEmpty");
var AxiosRequestConfigAdapter = /** @class */ (function () {
    function AxiosRequestConfigAdapter(_prop) {
        this._prop = _prop;
    }
    Object.defineProperty(AxiosRequestConfigAdapter.prototype, "method", {
        get: function () {
            if (isEmpty_1.isEmpty(this._prop.method)) {
                return HTTP_METHOD_1.HTTP_METHOD.GET;
            }
            var method = this._prop.method.toUpperCase();
            switch (method) {
                case 'GET': {
                    return HTTP_METHOD_1.HTTP_METHOD.GET;
                }
                case 'POST': {
                    return HTTP_METHOD_1.HTTP_METHOD.POST;
                }
                case 'PUT': {
                    return HTTP_METHOD_1.HTTP_METHOD.PUT;
                }
                case 'PATCH': {
                    return HTTP_METHOD_1.HTTP_METHOD.PATCH;
                }
                case 'DELETE': {
                    return HTTP_METHOD_1.HTTP_METHOD.DELETE;
                }
                case 'HEAD': {
                    return HTTP_METHOD_1.HTTP_METHOD.HEAD;
                }
                case 'OPTIONS': {
                    return HTTP_METHOD_1.HTTP_METHOD.OPTIONS;
                }
                default: {
                    return HTTP_METHOD_1.HTTP_METHOD.GET;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxiosRequestConfigAdapter.prototype, "headers", {
        get: function () {
            if (isEmpty_1.isEmpty(this._prop.headers)) {
                return {};
            }
            return this._prop.headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxiosRequestConfigAdapter.prototype, "body", {
        get: function () {
            return this._prop.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxiosRequestConfigAdapter.prototype, "url", {
        get: function () {
            return "" + (this._prop.baseURL || '') + (this._prop.url || '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxiosRequestConfigAdapter.prototype, "params", {
        get: function () {
            var _a = this._prop, paramsSerializer = _a.paramsSerializer, params = _a.params;
            if (params !== undefined) {
                if (paramsSerializer !== undefined) {
                    return paramsSerializer(params);
                }
                return Object.entries(params).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return key + "=" + encodeURIComponent(JSON.stringify(value));
                }).join('&');
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return AxiosRequestConfigAdapter;
}());
exports.AxiosRequestConfigAdapter = AxiosRequestConfigAdapter;
