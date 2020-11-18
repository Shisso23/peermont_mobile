/* eslint-disable import/no-unresolved */
import { API_LOCATION, CLIENT_ID, CLIENT_SECRET, HOST_URL } from '@env';

export default {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  hostUrl: HOST_URL,
  apiUrl: `${HOST_URL}${API_LOCATION}`,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};
