import _ from 'lodash';

export const userCreditCardModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  tokenizedCard: _.get(_model, 'tokenized_card'),
  obfuscatedCardNumber: _.get(_model, 'obfuscated_card_number'),
  cardType: _.get(_model, 'card_type'),
  cardHolder: _.get(_model, 'card_holder'),
  expiryMonth: _.get(_model, 'expiry_month'),
  expiryYear: _.get(_model, 'expiry_year'),
  status: _.get(_model, 'status'),
  userId: _.get(_model, 'user_id'),
});

export const constructUserCreditCardModels = (creditCards) => {
  return (creditCards && creditCards.map((card) => userCreditCardModel(card))) || [];
};
