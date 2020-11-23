import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,
  registerUrl: () => `${apiUrl}/registrations`,
  signOutUrl: () => `${hostUrl}/users/sign_out`,
  requestResetPasswordOtpUrl: () => `${apiUrl}/users/send_password_otp`,
  verifyResetPasswordOtpUrl: () => `${apiUrl}/users/verify_password_otp`,
  verifyRegisterOtpUrl: () => `${apiUrl}/registrations/verify_otp`,
  resetPasswordUrl: () => `${apiUrl}/users/reset_password`,
  setPasswordUrl: () => `${apiUrl}/users/reset_password`,
};
