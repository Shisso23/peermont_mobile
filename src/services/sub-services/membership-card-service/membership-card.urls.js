import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  membershipCardsUrl: () => `${apiUrl}/membership_cards`,
  membershipCardUrl: (id) => `${apiUrl}/membership_cards/${id}`,
  membershipCardBalanceUrl: (id) => `${apiUrl}/membership_cards/${id}/cash`,
  membershipCardPointsUrl: (id) => `${apiUrl}/membership_cards/${id}/points`,
  membershipCardPatronEnquiryUrl: () =>
    `${apiUrl}/membership_cards/update_mobile_number_patron_enquiry`,
  membershipNumberCheck: (id) => `${apiUrl}/membership_cards/${id}/number_changed`,
};
