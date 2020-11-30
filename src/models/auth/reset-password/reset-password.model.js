/* eslint-disable camelcase */
import { parseMobile } from '../auth-utils/auth.utils';

export const resetPasswordModel = ({ login, callingCode, country } = {}) => ({
  mobileNumber: login || '',
  callingCode: callingCode || '27',
  country: country || 'ZA',
});

export const apiResetPasswordModel = ({ mobileNumber, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
});
