import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;

export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,

  registerUrl: () => `${apiUrl}/registrations`,
  registerSendOtpUrl: () => `${apiUrl}/registrations/send_otp`,
  verifyRegisterOtpUrl: () => `${apiUrl}/registrations/verify_otp`,

  requestResetPasswordOtpUrl: () => `${apiUrl}/users/send_password_otp`,
  verifyResetPasswordOtpUrl: () => `${apiUrl}/users/verify_password_otp`,
  resetPasswordUrl: () => `${apiUrl}/users/reset_password`,
  setPasswordUrl: () => `${apiUrl}/users/reset_password`,

  signOutUrl: () => `${hostUrl}/users/sign_out`,

  userBiometricKeysUrl: () => `${apiUrl}/user_biometric_keys`,
};
