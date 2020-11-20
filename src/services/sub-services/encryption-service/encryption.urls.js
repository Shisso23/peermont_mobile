import appConfig from '../../../config';

const { apiUrl } = appConfig;
export default {
  certificateUrl: () => `${apiUrl}/membership_cards/certificate`,
};
