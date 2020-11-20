import authNetworkService from '../auth-network-service/auth-network.service';
import bankAccountUrls from './bank-account.urls';
import { userBankAccountModel } from '../../../models';

const getBankAccounts = () => {
  const url = bankAccountUrls.bankAccountsUrl();
  const _createAndReturnBankAccountsModel = (apiResponse) => {
    return userBankAccountModel(apiResponse.data);
  };
  return authNetworkService
    .get(url)
    .then(_createAndReturnBankAccountsModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const deleteBankAccount = (id) => {
  const url = bankAccountUrls.bankAccountUrl(id);
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
  getBankAccounts,
  deleteBankAccount,
};
