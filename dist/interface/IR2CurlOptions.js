"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_HEADER_CONTENT_TYPE_1 = require("../enum/HTTP_HEADER_CONTENT_TYPE");
exports.defaultR2CurlOptions = {
    quote: 'single',
    defaultContentType: HTTP_HEADER_CONTENT_TYPE_1.HTTP_HEADER_CONTENT_TYPE.JSON_UTF8,
    forceBody: false,
};
