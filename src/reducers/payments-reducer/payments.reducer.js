import CreateAction from '../action-utilities/action-creator';

const reducerName = 'payment';

const setPendingPaymentId = CreateAction(reducerName, 'SET_PENDING_PAYMENT_ID');
export const setPendingPaymentIdAction = setPendingPaymentId.action;

const setPaymentUriAction = CreateAction(reducerName, 'SET_PAYMENT_URI_ACTION');
export const setPaymentUriActionAction = setPaymentUriAction.action;

const initialState = {
  pendingPaymentId: null,
  paymentUri: null,
};

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
    default:
      return state;
  }
}
