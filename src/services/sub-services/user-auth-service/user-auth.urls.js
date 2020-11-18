import appConfig from '../../../config';

const { hostUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/oauth/token`,
  registerUrl: () => `${hostUrl}/users`,
  forgotPasswordUrl: () => `${hostUrl}/users/password`,
};
