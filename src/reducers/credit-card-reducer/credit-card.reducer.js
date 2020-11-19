import CreateAction from '../action-utilities/action-creator';
// import { creditCardModel } from '../../models';

const reducerName = 'creditCard';

const setCreditCards = CreateAction(reducerName, 'SET_CREDIT_CARDS');
export const setCreditCardsAction = setCreditCards.action;
export const setCreditCardsActionType = setCreditCards.actionType;

const initialState = {
  creditCards: [],
};

export default function creditCardReducer(state = initialState, action) {
  switch (action.type) {
    case setCreditCards.actionType:
      return {
        ...state,
        creditCards: action.payload,
      };

    default:
      return state;
  }
}
