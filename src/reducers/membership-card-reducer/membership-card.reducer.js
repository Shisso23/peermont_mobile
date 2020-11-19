import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setMembershipCards = CreateAction(reducerName, 'SET_MEMBERSHIP_CARDS');
export const setMembershipCardsAction = setMembershipCards.action;

const removeMembershipCard = CreateAction(reducerName, 'REMOVE_MEMBERSHIP_CARD');
export const removeMembershipCardAction = removeMembershipCard.action;

const initialState = {
  membershipCards: [],
};

export default function membershipCardReducer(state = initialState, action) {
  switch (action.type) {
    case setMembershipCards.actionType:
      return {
        ...state,
        membershipCards: action.payload,
      };
    case removeMembershipCard.actionType:
      return {
        ...state,
        membershipCards: _.remove(state.bankAccounts, { id: action.payload }),
      };
    default:
      return state;
  }
}
