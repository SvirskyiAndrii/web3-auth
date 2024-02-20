export const setToCookies = (token, type, domain) => {
  if (token.length > 4096) {
    throw new Error('Token length exceeds maximum allowed.');
  }

  const options: any = {};

  token = encodeURIComponent(token);
  if (domain) {
    options.domain = domain;
  }
  document.cookie = `${type}=${token}; ${Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}`;
};

export const getFromCookies = (type) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${type}=`);
  return parts[parts.length - 1].split(';').shift();
};

export const removeFromCookies = (type, domain) => {
  // Set the expiration date in the past to effectively delete the cookie
  document.cookie =
    type +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' +
    domain +
    '; path=/';
};
