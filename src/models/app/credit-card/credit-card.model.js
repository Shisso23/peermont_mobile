import _ from 'lodash';

export const creditCardModel = (_model = {}) => ({
  cardHolder: _.get(_model, 'card_holder'),
  cardNumber: _.get(_model, 'pan'),
  cardType: _.get(_model, 'card_type'),
  expiryMonth: _.get(_model, 'expiry_month'),
  expiryYear: _.get(_model, 'expiry_year'),
  cvv: _.get(_model, 'cvv'),
  expiryDate: '',
});

export const apiCreditCardModel = (_model = {}) => ({
  credit_card: {
    card_holder: _.get(_model, 'cardHolder'),
    pan: _.get(_model, 'cardNumber'),
    card_type: _.get(_model, 'cardType'),
    expiry_month: _.get(_model, 'expiryMonth'),
    expiry_year: _.get(_model, 'expiryYear'),
    cvv: _.get(_model, 'cvv'),
  },
});
