import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  bankAccountsUrl: () => `${apiUrl}/bank_accounts`,
  bankAccountUrl: (id) => `${apiUrl}/bank_accounts/${id}`,
  resetBankAccountUrl: (id) => `${apiUrl}/bank_accounts/${id}/reset`,
  sendOtpUrl: () => `${apiUrl}/bank_accounts/send_otp`,
  verifyOtpUrl: () => `${apiUrl}/bank_accounts/verify_otp`,
};
