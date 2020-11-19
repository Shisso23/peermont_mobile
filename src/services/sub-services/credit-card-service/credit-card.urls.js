import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  creditCardsUrl: () => `${apiUrl}/credit_cards`,
  creditCardUrl: (id) => `${apiUrl}/credit_cards/${id}`,
};
