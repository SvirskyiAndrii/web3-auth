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
exports.web3NeyraAuth = void 0;
var ethers_1 = require("ethers");
var loginMetamask_1 = require("../loginMetamask");
var loginUnstoppableEffect_1 = require("../loginUnstoppableEffect");
var getUserRSAKeys_1 = require("../getUserRSAKeys");
var publicKeyToPem_1 = require("../publicKeyToPem");
var connectUserv8_1 = require("../connectUserv8");
var get_wallet_type_1 = require("../utils/get-wallet-type");
var SIGN_IN_ERROR_MESSAGES = {
    NO_WORKSPACE: 'User does not belong to any workspace',
    UNREGISTERED: 'Public address not found',
};
var web3NeyraAuth = function (_a) {
    var apiConfigs = _a.apiConfigs, history = _a.history, onboard = _a.onboard, savePubKey = _a.savePubKey, setSignatureError = _a.setSignatureError, signMessage = _a.signMessage, handlers = _a.handlers, callback = _a.callback;
    return __awaiter(void 0, void 0, void 0, function () {
        var searchParams, isoauth, redirectUrl, locationArray, subdomain;
        return __generator(this, function (_b) {
            searchParams = new URLSearchParams(history.location.search);
            isoauth = JSON.parse(searchParams.get('isoauth'));
            redirectUrl = !isoauth ? '/main' : "/oauth".concat(history.location.search);
            locationArray = history.location.pathname.split('/') || [];
            subdomain = locationArray.includes('w') && locationArray[2];
            if (onboard.wallet) {
                onboard.disconnect(onboard.wallet);
            }
            else {
                onboard.connect().then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                    var provider_1, label_1, walletType_1, currentAccount_1, sig_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!res.length) return [3 /*break*/, 2];
                                provider_1 = res[0].provider;
                                label_1 = res[0].label;
                                walletType_1 = (0, get_wallet_type_1.getWalletType)(label_1, onboard.wallet);
                                currentAccount_1 = res[0].accounts[0].address;
                                return [4 /*yield*/, signMessage(setSignatureError, provider_1).then(function (res) { return res.signature; })];
                            case 1:
                                sig_1 = _a.sent();
                                if ((sig_1 && label_1 === 'MetaMask') ||
                                    label_1 === 'Coinbase Wallet' ||
                                    label_1 === 'WalletConnect') {
                                    (0, loginMetamask_1.loginMetamask)({
                                        publicAddress: currentAccount_1 || window.ethereum.selectedAddress,
                                        signature: sig_1,
                                        history: history,
                                        slug: subdomain,
                                        redirectUrl: redirectUrl,
                                        API_SIGN_IN_METAMASK: apiConfigs.API_SIGN_IN_METAMASK,
                                        handlers: handlers,
                                        callback: callback,
                                    })
                                        .then(function (res) {
                                        if (!res.data.public_key || res.data.public_key.length === 0) {
                                            var currentProvider = new ethers_1.ethers.providers.Web3Provider(provider_1 !== null && provider_1 !== void 0 ? provider_1 : window.ethereum);
                                            var signer = currentProvider.getSigner();
                                            (0, getUserRSAKeys_1.getUserRSAKeys)({ signer: signer }).then(function (keys) {
                                                savePubKey(currentAccount_1 || window.ethereum.selectedAddress, (0, publicKeyToPem_1.publicKeyToPem)({ publicKey: keys.publicKey }));
                                                (0, connectUserv8_1.connectUserv8)({
                                                    wallet_privatekey: (0, publicKeyToPem_1.publicKeyToPem)({
                                                        publicKey: keys.publicKey,
                                                    }),
                                                    wallet_address: currentAccount_1 || window.ethereum.selectedAddress,
                                                    wallet_type: walletType_1,
                                                });
                                            });
                                        }
                                        else {
                                            (0, connectUserv8_1.connectUserv8)({
                                                wallet_privatekey: res.data.public_key || '',
                                                wallet_address: currentAccount_1 || window.ethereum.selectedAddress,
                                                wallet_type: walletType_1,
                                            });
                                        }
                                    })
                                        .catch(function (error) {
                                        if (SIGN_IN_ERROR_MESSAGES.UNREGISTERED === error.message) {
                                            if (label_1 === 'MetaMask' ||
                                                label_1 === 'Coinbase Wallet' ||
                                                label_1 === 'WalletConnect') {
                                                var is_coinbase = label_1 === 'Coinbase Wallet';
                                                handlers.includes('handleSignUp') &&
                                                    callback({
                                                        type: 'handleSignUp',
                                                        params: {
                                                            is_coinbase: is_coinbase,
                                                            searchParams: searchParams,
                                                            currentAccount: currentAccount_1,
                                                            provider: provider_1,
                                                            redirectUrl: redirectUrl,
                                                            label: walletType_1,
                                                        },
                                                    });
                                            }
                                            // @ts-ignore
                                            if (sig_1 && label_1 === 'Unstoppable') {
                                                (0, loginUnstoppableEffect_1.loginUnstoppableEffect)({
                                                    history: history,
                                                    redirectUrl: redirectUrl,
                                                    REACT_APP_UNSTOPPABLE_CLIENT_ID: apiConfigs.REACT_APP_UNSTOPPABLE_CLIENT_ID,
                                                    API_AUTH: apiConfigs.API_AUTH,
                                                });
                                            }
                                        }
                                        else if (error.message === SIGN_IN_ERROR_MESSAGES.NO_WORKSPACE) {
                                            history.push({
                                                pathname: '/no-workspace',
                                                state: { account: onboard.account },
                                            });
                                        }
                                        else {
                                            handlers.includes('addNotification') &&
                                                callback({
                                                    type: 'addNotification',
                                                    params: { message: error.message, type: 'error' },
                                                });
                                        }
                                    });
                                }
                                if (sig_1 && label_1 === 'Unstoppable') {
                                    (0, loginUnstoppableEffect_1.loginUnstoppableEffect)({
                                        history: history,
                                        redirectUrl: redirectUrl,
                                        REACT_APP_UNSTOPPABLE_CLIENT_ID: apiConfigs.REACT_APP_UNSTOPPABLE_CLIENT_ID,
                                        API_AUTH: apiConfigs.API_AUTH,
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
            }
            return [2 /*return*/];
        });
    });
};
exports.web3NeyraAuth = web3NeyraAuth;
