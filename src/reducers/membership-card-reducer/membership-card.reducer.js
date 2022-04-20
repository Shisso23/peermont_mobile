import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'membershipCard';

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setIsLoadingPoints = CreateAction(reducerName, 'SET_IS_LOADING_POINTS');
export const setIsLoadingPointsAction = setIsLoadingPoints.action;

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

const setPointsBalances = CreateAction(reducerName, 'SET_POINTS_BALANCES');
export const setPointsBalancesAction = setPointsBalances.action;

const setTempCardInfo = CreateAction(reducerName, 'SET_TEMP_CARD_INFO');
export const setTempCardInfoAction = setTempCardInfo.action;

const initialState = {
  isLoading: false,
  isLoadingPoints: false,
  membershipCards: [],
  membershipCardPins: [],
  currentMembershipCard: null,
  currentMembershipCardPin: null,
  pointsBalances: {},
  tempCardInfo: {},
};

export const membershipCardSelector = (reducers) => reducers.membershipCardReducer;

export default function membershipCardReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setIsLoadingPoints.actionType:
      return {
        ...state,
        isLoadingPoints: action.payload,
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
    case setPointsBalances.actionType:
      return {
        ...state,
        pointsBalances: action.payload,
      };
    case setTempCardInfo.actionType:
      return {
        ...state,
        tempCardInfo: action.payload,
      };
    default:
      return state;
  }
}
