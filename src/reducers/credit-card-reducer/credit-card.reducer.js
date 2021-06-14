import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'creditCard';

const setCreditCards = CreateAction(reducerName, 'SET_CREDIT_CARDS');
export const setCreditCardsAction = setCreditCards.action;

const removeCreditCard = CreateAction(reducerName, 'REMOVE_CREDIT_CARD');
export const removeCreditCardAction = removeCreditCard.action;

const setLoading = CreateAction(reducerName, 'SET_LOADING');
export const setLoadingAction = setLoading.action;

const setPrivateKey = CreateAction(reducerName, 'SET_PRIVATE_KEY');
export const setPrivateKeyAction = setPrivateKey.action;
const initialState = {
  creditCards: [],
  isLoading: false,
  privateKey: null,
};

export default function creditCardReducer(state = initialState, action) {
  switch (action.type) {
    case setCreditCards.actionType:
      return {
        ...state,
        creditCards: action.payload,
      };
    case removeCreditCard.actionType:
      _.remove(state.creditCards, { id: action.payload });
      return {
        ...state,
      };
    case setLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setPrivateKey.actionType:
      return {
        ...state,
        privateKey: action.payload,
      };
    default:
      return state;
  }
}
