import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  membershipCardsUrl: () => `${apiUrl}/membership_cards`,
  membershipCardUrl: (id) => `${apiUrl}/membership_cards/${id}`,
};
