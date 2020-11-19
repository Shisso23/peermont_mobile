/* eslint-disable camelcase */
export const userCreditCardModel = ({
  id,
  tokenized_card,
  obfuscated_card_number,
  card_type,
  card_holder,
  expiry_month,
  expiry_year,
  status,
  user_id,
} = {}) => ({
  id: id || '',
  tokenizedCard: tokenized_card || '',
  obfuscatedCardNumber: obfuscated_card_number || '',
  cardType: card_type || '',
  cardHolder: card_holder || '',
  expiryMonth: expiry_month || '',
  expiryYear: expiry_year || '',
  status: status || '',
  userId: user_id || '',
});

export const constructUserCreditCardModels = (creditCards) => {
  return (creditCards && creditCards.map((card) => userCreditCardModel(card))) || [];
};
