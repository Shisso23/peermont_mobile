/* eslint-disable camelcase */
export const otpModel = ({ otp } = {}) => ({
  numeric: otp || '',
});

export const apiOtpModel = ({ numeric } = {}, token) => ({
  otp: numeric || '',
  token: token || '',
});
