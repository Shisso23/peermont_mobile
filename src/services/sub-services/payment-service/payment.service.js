import _ from 'lodash';
import paymentUrls from './payment.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiPaymentModel,
  apiSendPaymentOtpModel,
  apiPaymentOtpModel,
  otpModel,
} from '../../../models';

const _extractAndReturnPaymentId = (apiResponse) => {
  return _.get(apiResponse, 'data.id');
};

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

export const sendPaymentOtp = (paymentId, sendTo) => {
  const url = paymentUrls.sendOtp(paymentId);
  const apiModel = apiSendPaymentOtpModel({ sendTo });

  return authNetworkService.post(url, apiModel);
};

export const sendPaymentOtpEmail = (paymentId, sendTo) => {
  const url = paymentUrls.sendEmailOtp(paymentId);
  const apiModel = apiSendPaymentOtpModel({ sendTo });

  return authNetworkService.post(url, apiModel);
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
  const _extractAndReturnPayableId = (apiResponse) => _.get(apiResponse, 'data.id');
  return authNetworkService
    .post(url, { instant_eft: { bank_id: null } })
    .then(_extractAndReturnPayableId);
};

export const getTransactions = () => {
  const transactionsUrl = paymentUrls.transactions();
  const returnTransactions = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(transactionsUrl).then(returnTransactions);
};

export const getHasQueuedPayouts = (membershipCardId) => {
  const HasQueuedPayoutsUrl = paymentUrls.hasQueuedPayoutsUrl();
  const returnHasQueued = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(HasQueuedPayoutsUrl, membershipCardId).then(returnHasQueued);
};

export default {
  createPayment,
  sendPaymentOtp,
  sendPaymentOtpEmail,
  verifyPaymentOtp,
  getLastPaymentUri,
  createEft,
  getTransactions,
  getHasQueuedPayouts,
};
