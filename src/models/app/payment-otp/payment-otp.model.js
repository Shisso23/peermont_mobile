/* eslint-disable camelcase */

export const apiPaymentOtpModel = ({ numeric } = {}, membershipCardPin) => ({
  pin: membershipCardPin || '',
  otp: numeric || '',
});
