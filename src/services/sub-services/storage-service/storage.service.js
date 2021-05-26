import config from '../../../config';
import { saveItem, getItem, removeItem } from './storage.service.utils';

const SIGN_IN_FORM = 'SIGN_IN_FORM';

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

const signInFormOperations = {
  getSignInForm: () => getItem(SIGN_IN_FORM),
  storeSignInForm: (signInForm) => saveItem(SIGN_IN_FORM, signInForm),
  removeSignInForm: () => removeItem(SIGN_IN_FORM),
};

const biometricOperations = {
  getBiometricOtpOut: () => getItem(config.biometricOtpOut),
  storeBiometricOtpOut: (key) => saveItem(config.biometricOtpOut, key),
  removeBiometricOtpOut: () => removeItem(config.biometricOtpOut),
};

export default {
  ...accessTokenOperations,
  ...refreshTokenOperations,
  ...signInFormOperations,
  ...biometricOperations,
  saveItem,
  getItem,
  removeItem,
};
