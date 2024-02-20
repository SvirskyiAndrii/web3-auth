"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var cookies_1 = require("./cookies");
function default_1(res) {
    var token = (0, ramda_1.path)(['data', 'token'], res) || '';
    var refreshToken = (0, ramda_1.path)(['data', 'refresh_token'], res) || '';
    (0, cookies_1.removeFromCookies)('access_token', '.neyratech.com');
    (0, cookies_1.removeFromCookies)('refresh_token', '.neyratech.com');
    if (token) {
        (0, cookies_1.setToCookies)(token, 'access_token', '.neyratech.com');
    }
    if (refreshToken) {
        (0, cookies_1.setToCookies)(refreshToken, 'refresh_token', '.neyratech.com');
    }
}
exports.default = default_1;
