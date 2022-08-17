import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  availableCarWashes: () => `${apiUrl}/car_washes/get_available_vouchers`,
};
