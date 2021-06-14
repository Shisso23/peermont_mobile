import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  splashUrl: () => `${apiUrl}/adverts/home_screen`,
};
