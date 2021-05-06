import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: (userId) => `${apiUrl}/users/${userId}`,
  userShowDetailsUrl: () => `${apiUrl}/users/show_details`,
  updateDetailsUrl: () => `${apiUrl}/users/update_details`,
  verifyUpdateMobileOtp: () => `${apiUrl}/users/verify_update_mobile_otp`,
  resendUpdateMobileOtp: () => `${apiUrl}/users/resend_update_mobile_otp`,
  updateDailyTopUpLimit: () => `${apiUrl}/users/update_daily_top_up_limit`,
};
