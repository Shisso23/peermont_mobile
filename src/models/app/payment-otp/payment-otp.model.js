import _ from 'lodash';

export const apiPaymentOtpModel = (_model = {}, membershipCardPin) => ({
  pin: membershipCardPin || '',
  otp: _.get(_model, 'numeric'),
});

export const apiSendPaymentOtpModel = (_model) => ({
  to: _.get(_model, 'sendTo'),
});
