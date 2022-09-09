import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  availableCarWashes: () => `${apiUrl}/car_washes/get_available_vouchers`,
  claimHistory: () => `${apiUrl}/car_washes/get_claim_history`,
  claimCarWashVoucher: () => `${apiUrl}/car_washes/claim_voucher`,
  voucherCount: () => `${apiUrl}/car_washes/voucher_count`,
  canClaimVoucher: () => `${apiUrl}/car_washes/can_claim_voucher`,
  sendCanClaimOtp: () => `${apiUrl}/car_washes/send_can_claim_otp`,
  getCarDetailsForm: () => `${apiUrl}/car_washes/get_car_form`,
  submitCarWashDetails: () => `${apiUrl}/car_washes/submit_car_form`,
};
