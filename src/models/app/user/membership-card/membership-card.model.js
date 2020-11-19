/* eslint-disable camelcase */
export const membershipCardModel = ({ id, card_number } = {}) => ({
  id: id || '',
  cardNumber: card_number || ''
});

export const apiUserModel = ({ email, name } = {}) => ({
  user: {
    email: email || '',
    name: name || '',
  },
});
