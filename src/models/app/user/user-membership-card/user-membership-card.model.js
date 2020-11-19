/* eslint-disable camelcase */
export const userMembershipCardModel = ({
  id,
  card_number,
  card_valid,
  balance,
  balance_format,
  points,
  status,
  tier,
  poins_balance,
} = {}) => ({
  id: id || '',
  cardNumber: card_number || '',
  cardValid: card_valid || '',
  balance: balance || '',
  balanceFormat: balance_format || '',
  points: points || '',
  status: status || '',
  tier: tier || '',
  pointsBalance: poins_balance || '',
});

export const apiUserModel = ({ email, name } = {}) => ({
  user: {
    email: email || '',
    name: name || '',
  },
});

export const constructUserMembershipCardModel = (membershipCardsArray) => {
  return (
    (membershipCardsArray && membershipCardsArray.map((card) => userMembershipCardModel(card))) ||
    []
  );
};
