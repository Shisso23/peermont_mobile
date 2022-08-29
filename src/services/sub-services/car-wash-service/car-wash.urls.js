import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  availableCarWashes: () => `${apiUrl}/car_washes/get_available_vouchers`,
  claimHistory: () => `${apiUrl}/car_washes/get_claim_history`,
  claimCarWashVoucher: () => `${apiUrl}/car_washes/claim_voucher`,
};
