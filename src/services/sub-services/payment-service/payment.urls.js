import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  paymentUrl: (id) => `${apiUrl}/payments/${id || ''}`,
  sendOtp: (id) => `${apiUrl}/payments/${id}/send_otp`,
  sendEmailOtp: (id) => `${apiUrl}/payments/${id}/send_otp_email`,
  verifyOtp: (id) => `${apiUrl}/payments/${id}/verify_otp`,
  eftPaymentUrl: () => `${apiUrl}/instant_efts`,
  transactions: () => `${apiUrl}/payments/transaction_statements`,
  hasQueuedPayoutsUrl: () => `${apiUrl}/payments/has_queued_payouts`,
};
