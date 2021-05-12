import CreateAction from '../action-utilities/action-creator';

const reducerName = 'payment';

const setPendingPaymentId = CreateAction(reducerName, 'SET_PENDING_PAYMENT_ID');
export const setPendingPaymentIdAction = setPendingPaymentId.action;

const setPaymentUriAction = CreateAction(reducerName, 'SET_PAYMENT_URI_ACTION');
export const setPaymentUriActionAction = setPaymentUriAction.action;

const setTransactions = CreateAction(reducerName, 'SET_TRANSACTIONS');
export const setTransactionsAction = setTransactions.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  pendingPaymentId: null,
  paymentUri: null,
  transactions: [],
  isLoading: false,
};

export const paymentSelector = (reducer) => reducer.paymentReducer;

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case setPendingPaymentId.actionType:
      return {
        ...state,
        pendingPaymentId: action.payload,
      };
    case setPaymentUriAction.actionType:
      return {
        ...state,
        paymentUri: action.payload,
      };
    case setTransactions.actionType:
      return {
        ...state,
        transactions: action.payload,
      };
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
