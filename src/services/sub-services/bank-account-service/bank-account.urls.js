import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  bankAccountsUrl: () => `${apiUrl}/bank_accounts`,
  bankAccountUrl: (id) => `${apiUrl}/bank_accounts/${id}`,
  resetBankAccountUrl: (id) => `${apiUrl}/bank_accounts/${id}/reset`,
};
