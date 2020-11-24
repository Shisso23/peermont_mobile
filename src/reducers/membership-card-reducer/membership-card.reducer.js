import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setMembershipCards = CreateAction(reducerName, 'SET_MEMBERSHIP_CARDS');
export const setMembershipCardsAction = setMembershipCards.action;

const removeMembershipCard = CreateAction(reducerName, 'REMOVE_MEMBERSHIP_CARD');
export const removeMembershipCardAction = removeMembershipCard.action;

const appendMembershipCard = CreateAction(reducerName, 'APPEND_MEMBERSHIP_CARD');
export const appendMembershipCardAction = appendMembershipCard.action;
export const appendMembershipCardActionType = appendMembershipCard.actionType;

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
    case appendMembershipCard.actionType:
      return {
        ...state,
        membershipCards: _.concat(state.membershipCards, [action.payload]),
      };
    default:
      return state;
  }
}
