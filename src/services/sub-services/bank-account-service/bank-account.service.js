import _ from 'lodash';
import authNetworkService from '../auth-network-service/auth-network.service';
import bankAccountUrls from './bank-account.urls';
import { userBankAccountModel, apiBankAccountModel, bankAccountModel } from '../../../models';

import { constructProofOfBankFormData } from './bank-account.utils';

const _exstractUploadDocumentId = (apiResponse) => _.get(apiResponse, 'data.id');

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

const createBankAccount = (formData) => {
  let newBankAccount;
  const _returnNewBankAccount = () => newBankAccount;

  const _exstractNewBankAccount = (apiResponse) => {
    const bankAccount = _.get(apiResponse, 'data');
    newBankAccount = userBankAccountModel(bankAccount);
    return apiResponse;
  };

  const _uploadProofOfBankDocument = (bankAccountId) => {
    const proofOfBankUrl = bankAccountUrls.bankAccountUrl(bankAccountId);
    const proofOfBankData = constructProofOfBankFormData(formData.proofOfBankDocument);
    return authNetworkService.patch(proofOfBankUrl, proofOfBankData);
  };

  const creatBankAccountUrl = bankAccountUrls.bankAccountsUrl();
  const apiModel = apiBankAccountModel(formData);
  return authNetworkService
    .post(creatBankAccountUrl, apiModel)
    .then(_exstractNewBankAccount)
    .then(_exstractUploadDocumentId)
    .then(_uploadProofOfBankDocument)
    .then(_returnNewBankAccount)
    .catch((err) => {
      err.error = bankAccountModel(err.error);
      return Promise.reject(err);
    });
};

const deleteBankAccount = (id) => {
  const url = bankAccountUrls.bankAccountUrl(id);
  return authNetworkService.delete(url).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  getBankAccounts,
  deleteBankAccount,
  createBankAccount,
};
