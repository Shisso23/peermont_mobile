import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  bankAccountsUrl: () => `${apiUrl}/bank_accounts`,
};
