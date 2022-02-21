/* eslint-disable camelcase */
import { parseMobile } from '../auth-utils/auth.utils';

export const resetPasswordModel = ({ login, callingCode, country } = {}) => ({
  mobileNumber: login || '',
  callingCode: callingCode || '27',
  country: country || 'ZA',
});

export const apiResetPasswordModelOtp = ({ mobileNumber, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
});

export const apiResetPasswordModel = ({ password } = {}, token) => ({
  password: password || '',
  token: token || '',
});
