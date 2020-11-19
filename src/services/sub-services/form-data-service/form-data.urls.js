import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  banksUrl: () => `${apiUrl}/banks`,
};
