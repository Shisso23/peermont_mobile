import authNetworkService from '../auth-network-service/auth-network.service';
import { creditCardModel, apiCreditCardModel } from '../../../models';
import creditCardUrls from './credit-card.urls';

const getCreditCards = () => {
  const url = creditCardUrls.creditCardsUrl();
  const _createAndReturnCreditCardModel = (apiResponse) => {
    return creditCardModel(apiResponse.data);
  };
  return authNetworkService
    .get(url)
    .then(_createAndReturnCreditCardModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const deleteCreditCard = (id) => {
  const url = creditCardUrls.creditCardUrl(id);
  return authNetworkService
    .delete(url)
    .then()
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getCreditCards,
  deleteCreditCard,
};
