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
import setToken from '../utils/set-token';
export const connectUserv8 = ({ wallet_privatekey, wallet_address, wallet_type, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.put('https://api.neyratech.com/api/auth/identity/connect_userv8', {
            provider: 'walletconnect',
            wallet_address,
            wallet_type,
            wallet_privatekey,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setToken(response);
    }
    catch (error) {
        console.error(error);
    }
});
