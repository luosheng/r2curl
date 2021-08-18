"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Standard Http Methods
 * @see https://tools.ietf.org/html/rfc7231#section-4.3
 */
var HTTP_METHOD;
(function (HTTP_METHOD) {
    HTTP_METHOD["GET"] = "GET";
    HTTP_METHOD["POST"] = "POST";
    HTTP_METHOD["HEAD"] = "HEAD";
    HTTP_METHOD["PUT"] = "PUT";
    HTTP_METHOD["DELETE"] = "DELETE";
    HTTP_METHOD["OPTIONS"] = "OPTIONS";
    HTTP_METHOD["CONNECT"] = "CONNECT";
    HTTP_METHOD["TRACE"] = "TRACE";
    // purge is assumed to be non-standard, but it is used in many requests.
    HTTP_METHOD["PURGE"] = "PURGE";
    // patch is defined in https://tools.ietf.org/html/rfc5789
    HTTP_METHOD["PATCH"] = "PATCH";
})(HTTP_METHOD = exports.HTTP_METHOD || (exports.HTTP_METHOD = {}));
