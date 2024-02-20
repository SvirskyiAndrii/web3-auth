export const getWalletType = (label, wallet) => {
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
        wallet?.provider?.connector?.signer?.session?.peer?.metadata?.name ||
        'WalletConnect';
      break;
    default:
      walletType = null;
  }

  return walletType;
};
