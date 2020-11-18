import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: () => `${apiUrl}/users`,
};
