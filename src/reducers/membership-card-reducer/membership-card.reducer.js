import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setMembershipCards = CreateAction(reducerName, 'SET_MEMBERSHIP_CARDS');
export const setMembershipCardsAction = setMembershipCards.action;

const removeMembershipCard = CreateAction(reducerName, 'REMOVE_MEMBERSHIP_CARD');
export const removeMembershipCardAction = removeMembershipCard.action;

const appendMembershipCard = CreateAction(reducerName, 'APPEND_MEMBERSHIP_CARD');
export const appendMembershipCardAction = appendMembershipCard.action;

const setCurrentMembershipCard = CreateAction(reducerName, 'SET_CURRENT_MEMBERSHIP_CARD');
export const setCurrentMembershipCardAction = setCurrentMembershipCard.action;

const replaceCurrentMembershipCard = CreateAction(reducerName, 'REPLACE_CURRENT_MEMBERSHIP_CARD');
export const replaceCurrentMembershipCardAction = replaceCurrentMembershipCard.action;

const initialState = {
  membershipCards: [],
  currentMembershipCard: null,
};

export default function membershipCardReducer(state = initialState, action) {
  switch (action.type) {
    case setMembershipCards.actionType:
      return {
        ...state,
        membershipCards: action.payload,
      };
    case removeMembershipCard.actionType:
      _.remove(state.membershipCards, { id: action.payload });
      return {
        ...state,
      };
    case appendMembershipCard.actionType:
      return {
        ...state,
        membershipCards: _.concat(state.membershipCards, [action.payload]),
      };
    case setCurrentMembershipCard.actionType:
      return {
        ...state,
        currentMembershipCard: _.find(state.membershipCards, { id: action.payload }),
      };
    case replaceCurrentMembershipCard.actionType:
      return {
        ...state,
        currentMembershipCard: action.payload,
      };
    default:
      return state;
  }
}
