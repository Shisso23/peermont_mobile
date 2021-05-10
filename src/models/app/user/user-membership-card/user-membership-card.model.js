import _ from 'lodash';

export const userMembershipCardModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  cardNumber: _.get(_model, 'card_number'),
  cardValid: _.get(_model, 'card_valid', false),
  balance: _.get(_model, 'balance', 0),
  balanceFormat: _.get(_model, 'balance_format'),
  status: _.get(_model, 'status'),
  tierName: _.get(_model, 'tier_name'),
  pointsBalance: _.get(_model, 'points_balance'),
  bonusPointsBalance: _.get(_model, 'bonus_points_balance'),
  freePlayBalance: _.get(_model, 'free_play_balance'),
});

export const constructUserMembershipCardModels = (membershipCards) => {
  return (membershipCards && membershipCards.map((card) => userMembershipCardModel(card))) || [];
};
