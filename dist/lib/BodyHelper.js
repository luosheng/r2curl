"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_HEADER_1 = require("../enum/HTTP_HEADER");
var HTTP_HEADER_CONTENT_TYPE_1 = require("../enum/HTTP_HEADER_CONTENT_TYPE");
var isEmpty_1 = require("./isEmpty");
var BodyHelper = /** @class */ (function () {
    function BodyHelper(_headers, _rawBody) {
        this._headers = _headers;
        this._rawBody = _rawBody;
        this.body = null;
        this.contentType = this.getContentType();
        this.body = this.parseBody();
    }
    BodyHelper.prototype.toString = function () {
        if (isEmpty_1.isEmpty(this.body)) {
            return '';
        }
        return this.body;
    };
    BodyHelper.prototype.getContentType = function () {
        if (isEmpty_1.isEmpty(this._headers)) {
            return null;
        }
        var lowerHeaderArray = Object.entries(this._headers);
        var contentTypePair = lowerHeaderArray.filter(function (header) { return header[0].toLowerCase() === HTTP_HEADER_1.HTTP_HEADER_LOWERCASE.CONTENT_TYPE; })[0];
        if (isEmpty_1.isEmpty(contentTypePair)) {
            return null;
        }
        return contentTypePair[1];
    };
    BodyHelper.prototype.parseBody = function () {
        if (isEmpty_1.isEmpty(this._rawBody)) {
            return null;
        }
        if (isEmpty_1.isNotEmpty(this.contentType) &&
            this.contentType.includes(HTTP_HEADER_CONTENT_TYPE_1.HTTP_HEADER_CONTENT_TYPE.FORM_URLENCODED) &&
            isEmpty_1.isNotEmpty(this._rawBody) &&
            typeof this._rawBody === 'object') {
            return this.getFormBody();
        }
        return this.getTextBody();
    };
    BodyHelper.prototype.getFormBody = function () {
        return Object.entries(this._rawBody)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        })
            .join('&');
    };
    BodyHelper.prototype.getTextBody = function () {
        return typeof this._rawBody === 'object' || Array.isArray(this._rawBody) ? JSON.stringify(this._rawBody) : null;
    };
    return BodyHelper;
}());
exports.BodyHelper = BodyHelper;
