import CreateAction from '../action-utilities/action-creator';

const reducerName = 'carWash';

const setVouchers = CreateAction(reducerName, 'SET_VOUCHERS');
export const setVouchersAction = setVouchers.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  vouchers: [],
  isLoading: false,
};

export const carWashSelector = (reducers) => reducers.carWashReducer;

export default function carWashReducer(state = initialState, action) {
  switch (action.type) {
    case setVouchers.actionType:
      return {
        ...state,
        vouchers: action.payload,
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
