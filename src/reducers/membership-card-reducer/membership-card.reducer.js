import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setMembershipCards = CreateAction(reducerName, 'SET_MEMBERSHIP_CARDS');
export const setMembershipCardsAction = setMembershipCards.action;
export const setMembershipCardsActionType = setMembershipCards.actionType;

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

    default:
      return state;
  }
}
