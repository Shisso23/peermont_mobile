/* eslint-disable camelcase */
export const membershipCardModel = ({ card_number, card_pin } = {}) => ({
  cardNumber: card_number || '',
  pin: card_pin || '',
});

export const apiMembershipCardModel = ({ cardNumber, encryptedPin } = {}) => ({
  membership_card: {
    card_number: cardNumber || '',
    card_pin: encryptedPin || '',
  },
});
