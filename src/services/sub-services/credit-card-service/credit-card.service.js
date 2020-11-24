import authNetworkService from '../auth-network-service/auth-network.service';
import creditCardUrls from './credit-card.urls';
import { userCreditCardModel, apiCreditCardCardModel, creditCardModel } from '../../../models';

const _createAndReturnUserCreditCardModel = (apiResponse) => {
  return userCreditCardModel(apiResponse.data);
};

const getCreditCards = () => {
  const url = creditCardUrls.creditCardsUrl();
  return authNetworkService
    .get(url)
    .then(_createAndReturnUserCreditCardModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const createCreditCard = (formData) => {
  const createCreditCardUrl = creditCardUrls.creditCardsUrl();
  const apiModel = apiCreditCardCardModel(formData);
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

export default {
  getCreditCards,
  deleteCreditCard,
  createCreditCard,
};
