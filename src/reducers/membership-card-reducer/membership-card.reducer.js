import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setMembershipCards = CreateAction(reducerName, 'SET_MEMBERSHIP_CARDS');
export const setMembershipCardsAction = setMembershipCards.action;

const setMembershipCardPins = CreateAction(reducerName, 'SET_MEMBERSHIP_CARD_PINS');
export const setMembershipCardPinsAction = setMembershipCardPins.action;

const removeMembershipCard = CreateAction(reducerName, 'REMOVE_MEMBERSHIP_CARD');
export const removeMembershipCardAction = removeMembershipCard.action;

const appendMembershipCard = CreateAction(reducerName, 'APPEND_MEMBERSHIP_CARD');
export const appendMembershipCardAction = appendMembershipCard.action;

const setCurrentMembershipCard = CreateAction(reducerName, 'SET_CURRENT_MEMBERSHIP_CARD');
export const setCurrentMembershipCardAction = setCurrentMembershipCard.action;

const replaceCurrentMembershipCard = CreateAction(reducerName, 'REPLACE_CURRENT_MEMBERSHIP_CARD');
export const replaceCurrentMembershipCardAction = replaceCurrentMembershipCard.action;

const setCurrentMembershipCardPin = CreateAction(reducerName, 'SET_CURRENT_MEMBERSHIP_CARD_PIN');
export const setCurrentMembershipCardPinAction = setCurrentMembershipCardPin.action;

const initialState = {
  isLoading: false,
  membershipCards: [],
  membershipCardPins: [],
  currentMembershipCard: null,
  currentMembershipCardPin: null,
};

export default function membershipCardReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setMembershipCards.actionType:
      return {
        ...state,
        membershipCards: action.payload,
      };
    case setMembershipCardPins.actionType:
      return {
        ...state,
        membershipCardPins: action.payload,
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
    case setCurrentMembershipCardPin.actionType:
      return {
        ...state,
        currentMembershipCardPin: action.payload,
      };
    default:
      return state;
  }
}
