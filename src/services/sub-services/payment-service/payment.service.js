import _ from 'lodash';
import paymentUrls from './payment.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiPaymentModel, apiPaymentOtpModel, otpModel } from '../../../models';

const _extractAndReturnPaymentId = (apiResponse) => _.get(apiResponse, 'data.id');

const createPayment = (input) => {
  const url = paymentUrls.paymentUrl();
  const apiModel = apiPaymentModel(input);

  return authNetworkService
    .post(url, apiModel)
    .then(_extractAndReturnPaymentId)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
      return Promise.reject(err);
    });
};

export const verifyPaymentOtp = (paymentOtpForm, pendingPaymentId, currentMembershipCardPin) => {
  const url = paymentUrls.verifyOtp(pendingPaymentId);
  const apiModel = apiPaymentOtpModel(paymentOtpForm, currentMembershipCardPin);

  return authNetworkService.post(url, apiModel).catch((err) => {
    err.errors = otpModel(err.errors);
    return Promise.reject(err);
  });
};

export const getLastPaymentUri = (paymentId) => {
  const _extractAndReturnUri = (apiResponse) => _.get(apiResponse, 'data.redirect_url');
  const url = paymentUrls.paymentUrl(paymentId);
  return authNetworkService.get(url).then(_extractAndReturnUri);
};

export const createEft = () => {
  const url = paymentUrls.eftPaymentUrl();
  const _exstractAndReturnPayableId = (apiResponse) => _.get(apiResponse, 'data.id');
  return authNetworkService
    .post(url, { instant_eft: { bank_id: null } })
    .then(_exstractAndReturnPayableId);
};

export default {
  createPayment,
  verifyPaymentOtp,
  getLastPaymentUri,
  createEft,
};
