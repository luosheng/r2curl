"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEmpty(value) {
    if (value === undefined ||
        value === null ||
        ((typeof value === 'number' && isNaN(value)) ||
            (typeof value === 'string' && value === '') ||
            (Array.isArray(value) && value.length < 1) ||
            (typeof value === 'object' && Object.keys(value).length < 1))) {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
function isNotEmpty(value) {
    return !isEmpty(value);
}
exports.isNotEmpty = isNotEmpty;
