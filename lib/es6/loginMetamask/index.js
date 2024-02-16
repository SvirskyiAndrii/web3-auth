var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export const loginMetamask = ({ publicAddress, signature, history, dispatch, slug, redirectUrl, API_SIGN_IN_METAMASK, handleMetamaskLogin, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = {
        publicAddress,
        signature,
        slug,
    };
    if (!slug)
        delete body.slug;
    try {
        const res = yield axios.post(API_SIGN_IN_METAMASK, body);
        const token = res.data.token;
        if (token) {
            handleMetamaskLogin &&
                handleMetamaskLogin({ res, dispatch, redirectUrl, history });
        }
        return res;
    }
    catch (error) {
        throw (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
    }
});
