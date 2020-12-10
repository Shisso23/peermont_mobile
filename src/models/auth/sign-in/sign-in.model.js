/* eslint-disable camelcase */
import { parseMobile } from '../auth-utils/auth.utils';

export const signInModel = ({ mobileNumber, callingCode, country } = {}) => ({
  mobileNumber: mobileNumber || '',
  password: '',
  callingCode: callingCode || '27',
  country: country || 'ZA',
});

export const apiSignInModel = ({ mobileNumber, password, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
  password: password || '',
});
