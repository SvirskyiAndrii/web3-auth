"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCookies = exports.getFromCookies = exports.setToCookies = void 0;
var setToCookies = function (token, type, domain) {
    if (token.length > 4096) {
        throw new Error('Token length exceeds maximum allowed.');
    }
    var options = {};
    token = encodeURIComponent(token);
    if (domain) {
        options.domain = domain;
    }
    document.cookie = "".concat(type, "=").concat(token, "; ").concat(Object.entries(options)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    })
        .join('; '));
};
exports.setToCookies = setToCookies;
var getFromCookies = function (type) {
    var value = "; ".concat(document.cookie);
    var parts = value.split("; ".concat(type, "="));
    return parts[parts.length - 1].split(';').shift();
};
exports.getFromCookies = getFromCookies;
var removeFromCookies = function (type, domain) {
    // Set the expiration date in the past to effectively delete the cookie
    document.cookie =
        type +
            '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' +
            domain +
            '; path=/';
};
exports.removeFromCookies = removeFromCookies;
