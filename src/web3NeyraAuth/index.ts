import { ethers } from 'ethers';

import { IWeb3NeyraAuth } from '../types';

import { loginMetamask } from '../loginMetamask';
import { loginUnstoppableEffect } from '../loginUnstoppableEffect';
import { getUserRSAKeys } from '../getUserRSAKeys';
import { publicKeyToPem } from '../publicKeyToPem';
import { connectUserv8 } from '../connectUserv8';

import { getWalletType } from '../utils/get-wallet-type';

const SIGN_IN_ERROR_MESSAGES = {
  NO_WORKSPACE: 'User does not belong to any workspace',
  UNREGISTERED: 'Public address not found',
};

export const web3NeyraAuth = async ({
  apiConfigs,
  history,
  onboard,
  savePubKey,
  setSignatureError,
  signMessage,
  handlers,
  callback,
}: IWeb3NeyraAuth) => {
  const searchParams = new URLSearchParams(history.location.search);
  const isoauth = JSON.parse(searchParams.get('isoauth'));
  const redirectUrl = !isoauth ? '/main' : `/oauth${history.location.search}`;
  const locationArray = history.location.pathname.split('/') || [];
  const subdomain = locationArray.includes('w') && locationArray[2];

  if (onboard.wallet) {
    onboard.disconnect(onboard.wallet);
  } else {
    onboard.connect().then(async (res) => {
      if (res.length) {
        const provider = res[0].provider;
        const label = res[0].label;
        const walletType = getWalletType(label, onboard.wallet);
        const currentAccount = res[0].accounts[0].address;

        const sig = await signMessage(setSignatureError, provider).then(
          (res) => res.signature
        );
        if (
          (sig && label === 'MetaMask') ||
          label === 'Coinbase Wallet' ||
          label === 'WalletConnect'
        ) {
          loginMetamask({
            publicAddress: currentAccount || window.ethereum.selectedAddress,
            signature: sig,
            history,
            slug: subdomain,
            redirectUrl,
            API_SIGN_IN_METAMASK: apiConfigs.API_SIGN_IN_METAMASK,
            handlers,
            callback,
          })
            .then((res) => {
              if (!res.data.public_key || res.data.public_key.length === 0) {
                const currentProvider = new ethers.providers.Web3Provider(
                  provider ?? window.ethereum
                );
                const signer = currentProvider.getSigner();
                getUserRSAKeys({ signer }).then((keys) => {
                  savePubKey(
                    currentAccount || window.ethereum.selectedAddress,
                    publicKeyToPem({ publicKey: keys.publicKey })
                  );
                  connectUserv8({
                    wallet_privatekey: publicKeyToPem({
                      publicKey: keys.publicKey,
                    }),
                    wallet_address:
                      currentAccount || window.ethereum.selectedAddress,
                    wallet_type: walletType,
                  });
                });
              } else {
                connectUserv8({
                  wallet_privatekey: res.data.public_key || '',
                  wallet_address:
                    currentAccount || window.ethereum.selectedAddress,
                  wallet_type: walletType,
                });
              }
            })
            .catch((error) => {
              if (SIGN_IN_ERROR_MESSAGES.UNREGISTERED === error.message) {
                if (
                  label === 'MetaMask' ||
                  label === 'Coinbase Wallet' ||
                  label === 'WalletConnect'
                ) {
                  const is_coinbase = label === 'Coinbase Wallet';
                  handlers.includes('handleSignUp') &&
                    callback({
                      type: 'handleSignUp',
                      params: {
                        is_coinbase,
                        searchParams,
                        currentAccount,
                        provider,
                        redirectUrl,
                        label: walletType,
                      },
                    });
                }
                // @ts-ignore
                if (sig && label === 'Unstoppable') {
                  loginUnstoppableEffect({
                    history,
                    redirectUrl,
                    REACT_APP_UNSTOPPABLE_CLIENT_ID:
                      apiConfigs.REACT_APP_UNSTOPPABLE_CLIENT_ID,
                    API_AUTH: apiConfigs.API_AUTH,
                  });
                }
              } else if (
                error.message === SIGN_IN_ERROR_MESSAGES.NO_WORKSPACE
              ) {
                history.push({
                  pathname: '/no-workspace',
                  state: { account: onboard.account },
                });
              } else {
                handlers.includes('addNotification') &&
                  callback({
                    type: 'addNotification',
                    params: { message: error.message, type: 'error' },
                  });
              }
            });
        }
        if (sig && label === 'Unstoppable') {
          loginUnstoppableEffect({
            history,
            redirectUrl,
            REACT_APP_UNSTOPPABLE_CLIENT_ID:
              apiConfigs.REACT_APP_UNSTOPPABLE_CLIENT_ID,
            API_AUTH: apiConfigs.API_AUTH,
          });
        }
      }
    });
  }
};
