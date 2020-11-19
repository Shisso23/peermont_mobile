/* eslint-disable camelcase */
import _ from 'lodash';

export const signInModel = ({ mobileNumber, password, callingCode } = {}) => ({
  mobileNumber: mobileNumber || '',
  password: password || '',
  callingCode: callingCode || '27',
});

export const apiSignInModel = ({ mobileNumber, password, callingCode } = {}) => ({
  login: parseMobile(mobileNumber, callingCode) || '',
  password: password || '',
});

const parseMobile = (mobile, callingCode) => {
  if (_.startsWith(mobile, callingCode)) {
    return mobile;
  }
  if (_.startsWith(mobile, '0')) {
    return callingCode + _.trimStart(mobile, '0');
  }
  return mobile;
};
