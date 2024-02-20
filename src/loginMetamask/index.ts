import axios from 'axios';

export const loginMetamask = async ({
  publicAddress,
  signature,
  history,
  slug,
  redirectUrl,
  API_SIGN_IN_METAMASK,
  handlers,
  callback,
}) => {
  const body = {
    publicAddress,
    signature,
    slug,
  };
  if (!slug) delete body.slug;
  try {
    const res = await axios.post(API_SIGN_IN_METAMASK, body);
    const token = res.data.token;
    if (token) {
      handlers.includes('onSuccess') &&
        callback({
          type: 'onSuccess',
          params: { res, redirectUrl, history },
        });
    }
    return res;
  } catch (error) {
    throw error?.response?.data;
  }
};
