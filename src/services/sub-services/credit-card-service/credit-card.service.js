import authNetworkService from '../auth-network-service/auth-network.service';
import { creditCardModel, apiCreditCardModel } from '../../../models';
import creditCardUrls from './bank-account.urls';

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

export default {
  getCreditCards,
};
