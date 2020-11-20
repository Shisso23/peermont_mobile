import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'creditCard';

const setCreditCards = CreateAction(reducerName, 'SET_CREDIT_CARDS');
export const setCreditCardsAction = setCreditCards.action;

const removeCreditCard = CreateAction(reducerName, 'REMOVE_CREDIT_CARD');
export const removeCreditCardAction = removeCreditCard.action;

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
    case removeCreditCard.actionType:
      return {
        ...state,
        creditCards: _.remove(state.creditCards, { id: action.payload }),
      };
    default:
      return state;
  }
}
