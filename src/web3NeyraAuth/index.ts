import { IWeb3NeyraAuth } from '../types';

export const web3NeyraAuth = async ({
  authToken,
  refreshToken,
}: IWeb3NeyraAuth) => {
  console.log('web3NeyraAuth', { authToken, refreshToken });
};
