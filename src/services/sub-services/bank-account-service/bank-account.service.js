import authNetworkService from '../auth-network-service/auth-network.service';
import { bankAccountModel, apiBankAccountModel } from '../../../models';
import bankAccountUrls from './bank-account.urls';

const getBankAccounts = () => {
  const url = bankAccountUrls.bankAccountsUrl();
  const _createAndReturnBankAccountsModel = (apiResponse) => {
    return bankAccountModel(apiResponse.data);
  };
  return authNetworkService
    .get(url)
    .then(_createAndReturnBankAccountModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getBankAccounts,
};
