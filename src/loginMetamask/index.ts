import axios from 'axios';

export const loginMetamask = async ({
  publicAddress,
  signature,
  history,
  dispatch,
  slug,
  redirectUrl,
  API_SIGN_IN_METAMASK,
  handleMetamaskLogin,
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
      handleMetamaskLogin &&
        handleMetamaskLogin({ res, dispatch, redirectUrl, history });
    }
    return res;
  } catch (error) {
    throw error?.response?.data;
  }
};
