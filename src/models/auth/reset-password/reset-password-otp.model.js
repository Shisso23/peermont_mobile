/* eslint-disable camelcase */
export const resetPasswordOtpModel = ({ otp } = {}) => ({
  numeric: otp || '',
});

export const apiResetPasswordOtpModel = ({ numeric } = {}, token) => ({
  otp: numeric || '',
  token: token || '',
});
