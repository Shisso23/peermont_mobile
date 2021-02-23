import _ from 'lodash';
import authNetworkService from '../auth-network-service/auth-network.service';
import bankAccountUrls from './bank-account.urls';
import {
  userBankAccountModel,
  apiBankAccountModel,
  bankAccountModel,
  constructUserBankAccountModels,
} from '../../../models';

import { constructProofOfBankFormData } from './bank-account.utils';

const _extractUploadDocumentId = (apiResponse) => _.get(apiResponse, 'data.id');

const getBankAccounts = () => {
  const url = bankAccountUrls.bankAccountsUrl();

  return authNetworkService
    .get(url)
    .then((apiResponse) => constructUserBankAccountModels(apiResponse.data))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const createBankAccount = (formData) => {
  let newBankAccount;
  const _returnNewBankAccount = () => newBankAccount;

  const _extractNewBankAccount = (apiResponse) => {
    const bankAccount = _.get(apiResponse, 'data');
    newBankAccount = userBankAccountModel(bankAccount);
    return apiResponse;
  };

  const createBankAccountUrl = bankAccountUrls.bankAccountsUrl();
  const apiModel = apiBankAccountModel(formData);
  return authNetworkService
    .post(createBankAccountUrl, apiModel)
    .then(_extractNewBankAccount)
    .then(_returnNewBankAccount)
    .catch((err) => {
      err.error = bankAccountModel(err.error);
      return Promise.reject(err);
    });
};

const uploadBankAccountDocument = (bankAccountId, formData) => {
  const bankAccountUrl = bankAccountUrls.bankAccountUrl(bankAccountId);
  const proofOfBankData = constructProofOfBankFormData(formData.proofOfBankDocument);
  return authNetworkService.patch(bankAccountUrl, proofOfBankData).catch((err) => {
    err.error = bankAccountModel(err.error);
    return Promise.reject(err);
  });
};

const updateBankAccount = (bankAccountForm) => {
  const resetBankAccountUrl = bankAccountUrls.resetBankAccountUrl(bankAccountForm.id);
  const apiModel = apiBankAccountModel(bankAccountForm);

  return authNetworkService
    .post(resetBankAccountUrl, apiModel)
    .then(_extractUploadDocumentId)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
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

const uploadProofOfBankDocument = (bankAccountId, proofOfBankDocumentPath) => {
  const proofOfBankUrl = bankAccountUrls.bankAccountUrl(bankAccountId);
  const proofOfBankData = constructProofOfBankFormData(proofOfBankDocumentPath);
  return authNetworkService.patch(proofOfBankUrl, proofOfBankData);
};

export default {
  getBankAccounts,
  deleteBankAccount,
  createBankAccount,
  uploadBankAccountDocument,
  updateBankAccount,
  uploadProofOfBankDocument,
};
