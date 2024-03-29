"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUnstoppableEffect = void 0;
var axios_1 = require("axios");
var js_1 = require("@uauth/js");
var set_token_1 = require("../utils/set-token");
var loginUnstoppableEffect = function (_a) {
    var history = _a.history, redirectUrl = _a.redirectUrl, REACT_APP_UNSTOPPABLE_CLIENT_ID = _a.REACT_APP_UNSTOPPABLE_CLIENT_ID, API_AUTH = _a.API_AUTH;
    return __awaiter(void 0, void 0, void 0, function () {
        var uauth, authorization, wallet_address, _b, message, signature, login, error_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    uauth = new js_1.default({
                        clientID: REACT_APP_UNSTOPPABLE_CLIENT_ID,
                        redirectUri: window.location.origin,
                    });
                    return [4 /*yield*/, uauth.loginWithPopup()];
                case 1:
                    authorization = _d.sent();
                    wallet_address = (authorization.idToken || {}).wallet_address;
                    _b = Object.values((_c = authorization === null || authorization === void 0 ? void 0 : authorization.idToken) === null || _c === void 0 ? void 0 : _c.proof)[0], message = _b.message, signature = _b.signature;
                    return [4 /*yield*/, axios_1.default.post("".concat(API_AUTH, "/login_check_unstoppable"), {
                            publicAddress: wallet_address,
                            message: message,
                            signature: signature,
                        })];
                case 2:
                    login = _d.sent();
                    (0, set_token_1.default)(login);
                    history.push(redirectUrl);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.loginUnstoppableEffect = loginUnstoppableEffect;
