import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  membershipCardsUrl: () => `${apiUrl}/membership_cards`,
};
