"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var CommonUtils_1 = __importDefault(require("./CommonUtils"));
var isEmpty_1 = require("./isEmpty");
var log = debug_1.default('r2curl:OptionContainer');
// tslint:disable-next-line: class-name
var OptionContainer = /** @class */ (function () {
    function OptionContainer() {
        this.options = [];
    }
    // The following methods are used from time to time when needed.
    OptionContainer.prototype.add = function (command, value) {
        this.options.push({
            command: command,
            value: isEmpty_1.isNotEmpty(value) ? value : null,
        });
    };
    OptionContainer.prototype.toString = function () {
        log(this.options);
        return this.options
            .map(function (option) {
            var value = isEmpty_1.isNotEmpty(option.value) ? CommonUtils_1.default.wrapQuote(option.value) : null;
            return "" + option.command + (isEmpty_1.isNotEmpty(value) ? ' [[value]]'.replace('[[value]]', value) : '');
        })
            .join(' ');
    };
    // for Debug & testCase
    // tslint:disable-next-line: function-name
    OptionContainer.prototype.___reset = function () {
        this.options = [];
    };
    return OptionContainer;
}());
exports.OptionContainer = OptionContainer;
