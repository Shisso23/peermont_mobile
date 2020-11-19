/* eslint-disable camelcase */
export const userMembershipCardModel = ({
  id,
  card_number,
  card_valid,
  balance,
  balance_format,
  status,
  tier_name,
  points_balance,
} = {}) => ({
  id: id || '',
  cardNumber: card_number || '',
  cardValid: card_valid || false,
  balance: balance || 0,
  balanceFormat: balance_format || '',
  status: status || '',
  tierName: tier_name || '',
  pointsBalance: points_balance || 0,
});

export const constructUserMembershipCardModels = (membershipCards) => {
  return (membershipCards && membershipCards.map((card) => userMembershipCardModel(card))) || [];
};
