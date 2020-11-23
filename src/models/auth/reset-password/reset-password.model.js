/* eslint-disable camelcase */
import { parseMobile } from '../auth-utils/auth.utils';

export const resetPasswordModel = ({ login, callingCode } = {}) => ({
  mobileNumber: login || '',
  callingCode: callingCode || '27',
});

export const apiResetPasswordModel = ({ mobileNumber, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
});
