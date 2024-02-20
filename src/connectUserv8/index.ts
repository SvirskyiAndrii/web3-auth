import axios from 'axios';
import setToken from '../utils/set-token';

export const connectUserv8 = async ({
  wallet_privatekey,
  wallet_address,
  wallet_type,
}) => {
  try {
    const response = await axios.put(
      'https://api.neyratech.com/api/auth/identity/connect_userv8',
      {
        provider: 'walletconnect',
        wallet_address,
        wallet_type,
        wallet_privatekey,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setToken(response);
  } catch (error) {
    console.error(error);
  }
};
