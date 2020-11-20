/* eslint-disable camelcase */
import { parseMobile } from '../auth-utils/auth.utils';

export const signInModel = ({ mobileNumber, password, callingCode } = {}) => ({
  mobileNumber: mobileNumber || '',
  password: password || '',
  callingCode: callingCode || '27',
});

export const apiSignInModel = ({ mobileNumber, password, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
  password: password || '',
});
