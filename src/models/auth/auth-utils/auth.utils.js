import _ from 'lodash';

export const parseMobile = (mobile, callingCode) => {
  if (_.startsWith(mobile, callingCode)) {
    return mobile;
  }
  if (_.startsWith(mobile, '0')) {
    return callingCode + _.trimStart(mobile, '0');
  }
  return mobile;
};
