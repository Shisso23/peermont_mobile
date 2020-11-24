/* eslint-disable camelcase */
export const registrationMembershipCardModel = ({ card_number, pin } = {}) => ({
  cardNumber: card_number || '',
  pin: pin || '',
});

export const apiRegistrationMembershipCardModel = ({ cardNumber, encryptedPin } = {}) => ({
  registration: {
    card_number: cardNumber || '',
    pin: encryptedPin || '',
  },
});
