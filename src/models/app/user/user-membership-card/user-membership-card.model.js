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
  bonus_points_balance,
  free_play_balance,
} = {}) => ({
  id: id || '',
  cardNumber: card_number || '',
  cardValid: card_valid || false,
  balance: balance || 0,
  balanceFormat: balance_format || '',
  status: status || '',
  tierName: tier_name || '',
  pointsBalance: points_balance || 'N/A',
  bonusPointsBalance: bonus_points_balance || 'N/A',
  freePlayBalance: free_play_balance || 'N/A',
});

export const constructUserMembershipCardModels = (membershipCards) => {
  return (membershipCards && membershipCards.map((card) => userMembershipCardModel(card))) || [];
};
