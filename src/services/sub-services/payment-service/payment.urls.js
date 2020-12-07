import appConfig from '../../../config';
const { apiUrl } = appConfig;

export default {
  paymentUrl: (id) => `${apiUrl}/payments/${id || ''}`,
  verifyOtp: (id) => `${apiUrl}/payments/${id}/verify_otp`,
  eftPaymentUrl: () => `${apiUrl}/instant_efts`,
};
