import appConfig from '../../../config';

const { apiUrl, callpayUrl } = appConfig;

export default {
  creditCardsUrl: () => `${apiUrl}/credit_cards`,
  creditCardUrl: (id) => `${apiUrl}/credit_cards/${id}`,
  getCallpayCredentials: () => `${apiUrl}/credit_cards/get_callpay_credentials`,
  createTokenizedCreditCard: () => `${callpayUrl}/customer-token/direct`,
};
