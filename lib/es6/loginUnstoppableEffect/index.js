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
import UAuth from '@uauth/js';
export const loginUnstoppableEffect = ({ history, redirectUrl, REACT_APP_UNSTOPPABLE_CLIENT_ID, API_AUTH, setToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uauth = new UAuth({
            clientID: REACT_APP_UNSTOPPABLE_CLIENT_ID,
            redirectUri: window.location.origin,
        });
        const authorization = yield uauth.loginWithPopup();
        const { wallet_address } = authorization.idToken || {};
        // @ts-ignore
        const { message, signature } = Object.values((_a = authorization === null || authorization === void 0 ? void 0 : authorization.idToken) === null || _a === void 0 ? void 0 : _a.proof)[0];
        const login = yield axios.post(`${API_AUTH}/login_check_unstoppable`, {
            publicAddress: wallet_address,
            message,
            signature,
        });
        setToken(login);
        history.push(redirectUrl);
    }
    catch (error) {
        throw error;
    }
});
