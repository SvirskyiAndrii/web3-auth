import { path } from 'ramda';
import { setToCookies, removeFromCookies } from './cookies';

export default function (res) {
  const token = path(['data', 'token'], res) || '';
  const refreshToken = path(['data', 'refresh_token'], res) || '';
  removeFromCookies('access_token', '.neyratech.com');
  removeFromCookies('refresh_token', '.neyratech.com');
  if (token) {
    setToCookies(token, 'access_token', '.neyratech.com');
  }
  if (refreshToken) {
    setToCookies(refreshToken, 'refresh_token', '.neyratech.com');
  }
}
