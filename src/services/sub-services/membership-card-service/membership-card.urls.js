import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  membershipCardsUrl: () => `${apiUrl}/membership_cards`,
  membershipCardUrl: (id) => `${apiUrl}/membership_cards/${id}`,
  membershipCardBalanceUrl: (id) => `${apiUrl}/membership_cards/${id}/balance`,
  membershipCardPointsUrl: (id) => `${apiUrl}/membership_cards/${id}/points`,
};
