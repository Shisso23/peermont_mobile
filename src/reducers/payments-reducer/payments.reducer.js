import CreateAction from '../action-utilities/action-creator';

const reducerName = 'payment';

const setPendingPaymentId = CreateAction(reducerName, 'SET_PENDING_PAYMENT_ID');
export const setPendingPaymentIdAction = setPendingPaymentId.action;

const setPaymentUriAction = CreateAction(reducerName, 'SET_PAYMENT_URI_ACTION');
export const setPaymentUriActionAction = setPaymentUriAction.action;

const setTransactions = CreateAction(reducerName, 'SET_TRANSACTIONS');
export const setTransactionsAction = setTransactions.action;

const setEarnTransactions = CreateAction(reducerName, 'SET_EARN_TRANSACTIONS');
export const setEarnTransactionsAction = setEarnTransactions.action;

const setHasQueuedPayouts = CreateAction(reducerName, 'SET_HAS_QUEUED_PAYOUTS');
export const setHasQueuedPayoutsAction = setHasQueuedPayouts.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setIsLoadingOutlet = CreateAction(reducerName, 'SET_IS_LOADING_OUTLET');
export const setIsLoadingOutletAction = setIsLoadingOutlet.action;

const initialState = {
  pendingPaymentId: null,
  paymentUri: null,
  transactions: [],
  hasQueuedPayouts: false,
  earnTransactions: [],
  isLoading: false,
  isLoadingOutlet: false,
};

export const paymentSelector = (reducer) => reducer.paymentReducer;

export const paymentReducer = (state = initialState, action) => {
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
    case setEarnTransactions.actionType:
      return {
        ...state,
        earnTransactions: action.payload,
      };
    case setHasQueuedPayouts.actionType:
      return {
        ...state,
        hasQueuedPayouts: action.payload,
      };
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    case setIsLoadingOutlet.actionType:
      return {
        ...state,
        isLoadingOutlet: action.payload,
      };
    default:
      return state;
  }
}

export default {
  paymentReducer,
}
