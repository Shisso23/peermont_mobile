import _ from 'lodash';
import { obfuscateCardNumber } from '../../../helpers/credit-card.helper';

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

export const apiCreditCardModel = (_apiCreditCardModel = {}) => ({
  credit_card: {
    obfuscated_card_number: obfuscateCardNumber(_.get(_apiCreditCardModel, 'cardNumber')),
    card_type: _.get(_apiCreditCardModel, 'cardType'),
    card_holder: _.get(_apiCreditCardModel, 'cardHolder'),
    expiry_month: _.get(_apiCreditCardModel, 'expiryMonth'),
    expiry_year: _.get(_apiCreditCardModel, 'expiryYear'),
    tokenized_card: _.get(_apiCreditCardModel, 'token'),
    merchant_reference: _.get(_apiCreditCardModel, 'merchant_reference'),
  },
  callpay_response: {
    card_bin: _.get(_apiCreditCardModel, 'card_bin'),
    expiry_date: _.get(_apiCreditCardModel, 'expiry_date'),
    guid: _.get(_apiCreditCardModel, 'guid'),
    token: _.get(_apiCreditCardModel, 'token'),
    merchant_reference: _.get(_apiCreditCardModel, 'merchant_reference'),
  },
});

export const callPayPublicKeyModel = (_model) => ({
  credit_card: {
    public_pem: _.get(_model, 'publicPem', undefined),
  },
});

export const encryptedCallpayModel = (_model) => ({
  encodedUsername: _.get(_model, 'encoded_username', undefined),
  encodedPassword: _.get(_model, 'encoded_password', undefined),
  merchantReference: _.get(_model, 'merchant_reference', undefined),
});

export const callpayCreditCardModel = (_model) => {
  const expiry = _.get(_model, 'expiryMonth', '') + _.get(_model, 'expiryYear', '');

  return {
    merchant_reference: _.get(_model, 'merchantReference', ''),
    pan: _.get(_model, 'cardNumber', ''),
    cvv: _.get(_model, 'cvv', ''),
    expiry,
  };
};
