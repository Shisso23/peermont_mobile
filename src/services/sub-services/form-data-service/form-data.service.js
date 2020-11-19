import formDataUrls from './form-data.urls';
import { constructBankModels } from '../../../models/app/bank/bank.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import { prettyPrint } from '../../../dev-utils';

const getBankAccounts = () => {
  const url = formDataUrls.banksUrl();
  const _createAndReturnBankModels = (apiResponse) => {
    prettyPrint(constructBankModels(apiResponse.data));
    return constructBankModels(apiResponse.data);
  };
  return authNetworkService
    .get(url)
    .then(_createAndReturnBankModels)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getBankAccounts,
};
