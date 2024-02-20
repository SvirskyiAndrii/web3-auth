export const getWalletType = (label, wallet) => {
    var _a, _b, _c, _d, _e, _f;
    let walletType;
    switch (label) {
        case 'MetaMask':
        case 'Unstoppable':
            walletType = label;
            break;
        case 'Coinbase Wallet':
            walletType = 'Coinbase';
            break;
        case 'WalletConnect':
            walletType =
                ((_f = (_e = (_d = (_c = (_b = (_a = wallet === null || wallet === void 0 ? void 0 : wallet.provider) === null || _a === void 0 ? void 0 : _a.connector) === null || _b === void 0 ? void 0 : _b.signer) === null || _c === void 0 ? void 0 : _c.session) === null || _d === void 0 ? void 0 : _d.peer) === null || _e === void 0 ? void 0 : _e.metadata) === null || _f === void 0 ? void 0 : _f.name) ||
                    'WalletConnect';
            break;
        default:
            walletType = null;
    }
    return walletType;
};
