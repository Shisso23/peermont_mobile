/* eslint-disable camelcase */
export const creditCardModel = ({
  card_holder,
  pan,
  card_type,
  expiry_month,
  expiry_year,
  cvv,
} = {}) => ({
  cardHolder: card_holder || '',
  cardNumber: pan || '',
  cardType: card_type || '',
  expiryMonth: expiry_month || '',
  expiryYear: expiry_year || '',
  cvv: cvv || '',
  expiryDate: '',
});

export const apiCreditCardCardModel = ({
  cardHolder,
  cardNumber,
  cardType,
  expiryMonth,
  expiryYear,
  cvv,
} = {}) => ({
  credit_card: {
    card_holder: cardHolder || '',
    pan: cardNumber || '',
    card_type: cardType || '',
    expiry_month: expiryMonth || '',
    expiry_year: expiryYear || '',
    cvv: cvv || '',
  },
});
