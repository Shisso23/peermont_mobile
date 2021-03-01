/* eslint-disable camelcase */

export const apiPaymentOtpModel = ({ numeric } = {}, membershipCardPin) => ({
  pin: membershipCardPin || '',
  otp: numeric || '',
});

export const apiSendPaymentOtpModel = (send_to) => ({
  to: send_to || '',
});
