import _ from 'lodash';

import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';
import {
  userCreditCardModel,
  apiCreditCardModel,
  creditCardModel,
  constructUserCreditCardModels,
  callPayPublicKeyModel,
  encryptedCallpayModel,
  callpayCreditCardModel,
} from '../../../models';
import callpayNetworkService from '../callpay-network-service/callpay_network.service';
import { createCallpayBasicAuthInterceptor } from '../utils/interceptors';

const _createAndReturnUserCreditCardModel = (apiResponse) => {
  return userCreditCardModel(apiResponse.data);
};

const getCreditCards = () => {
  const url = creditCardUrls.creditCardsUrl();
  return authNetworkService
    .get(url)
    .then((apiResponse) => constructUserCreditCardModels(apiResponse.data))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const createCreditCard = (formData) => {
  const createCreditCardUrl = creditCardUrls.creditCardsUrl();
  const apiModel = apiCreditCardModel(formData);
  return authNetworkService
    .post(createCreditCardUrl, apiModel)
    .then(_createAndReturnUserCreditCardModel)
    .catch((err) => {
      err.error = creditCardModel(err.error);
      return Promise.reject(err);
    });
};

const deleteCreditCard = (id) => {
  const url = creditCardUrls.creditCardUrl(id);
  return authNetworkService.delete(url).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

const _createAndReturnEncryptedCallpayModel = (apiResponse) => {
  return encryptedCallpayModel(_.get(apiResponse, 'data'));
};

const getCallpayCredentials = (formData) => {
  const url = creditCardUrls.getCallpayCredentials();
  const apiModel = callPayPublicKeyModel(formData);
  return authNetworkService
    .post(url, apiModel)
    .then(_createAndReturnEncryptedCallpayModel)
    .catch((err) => {
      err.error = creditCardModel(err.error);
      return Promise.reject(err);
    });
};

const createTokenizedCreditCard = (formData, basicAuth) => {
  const url = creditCardUrls.createTokenizedCreditCard();
  const model = callpayCreditCardModel(formData);

  const params = new URLSearchParams();
  params.append('merchant_reference', model.merchant_reference.replace(/\s+/g, '+'));
  params.append('pan', model.pan);
  params.append('cvv', model.cvv);
  params.append('expiry', model.expiry);

  createCallpayBasicAuthInterceptor(callpayNetworkService, basicAuth);

  return callpayNetworkService
    .post(url, params)
    .then((apiResponse) => _.get(apiResponse, 'data'))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getCreditCards,
  createCreditCard,
  deleteCreditCard,
  getCallpayCredentials,
  createTokenizedCreditCard,
};
