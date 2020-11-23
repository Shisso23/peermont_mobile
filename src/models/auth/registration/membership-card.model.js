/* eslint-disable camelcase */
export const membershipCardModel = ({ card_number, pin } = {}) => ({
  cardNumber: card_number || '',
  pin: pin || '',
});

export const apiMembershipCardModel = ({ cardNumber, encryptedPin } = {}) => ({
  registration: {
    card_number: cardNumber || '',
    pin: encryptedPin || '',
  },
});
