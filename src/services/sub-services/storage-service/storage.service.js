import config from '../../../config';
import { saveItem, getItem, removeItem } from './storage.service.utils';

const accessTokenOperations = {
  getAccessToken: () => getItem(config.accessTokenKey),
  storeAccessToken: (token) => saveItem(config.accessTokenKey, token),
  removeAccessToken: () => removeItem(config.accessTokenKey),
};

const refreshTokenOperations = {
  getRefreshToken: () => getItem(config.refreshTokenKey),
  storeRefreshToken: (token) => saveItem(config.refreshTokenKey, token),
  removeRefreshToken: () => removeItem(config.refreshTokenKey),
};

export default {
  ...accessTokenOperations,
  ...refreshTokenOperations,
};
