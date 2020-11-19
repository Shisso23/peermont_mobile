import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,
  registerUrl: () => `${apiUrl}/registrations`,
  forgotPasswordUrl: () => `${hostUrl}/users/password`,
  signOutUrl: () => `${hostUrl}/users/sign_out`,
};
