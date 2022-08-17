import CreateAction from '../action-utilities/action-creator';

const reducerName = 'carWash';

const setVouchers = CreateAction(reducerName, 'SET_VOUCHERS');
export const setVouchersAction = setVouchers.action;

const setCarWashes = CreateAction(reducerName, 'SET_CAR_WASHES');
export const setCarWashesAction = setCarWashes.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  vouchers: [],
  carWashes: [],
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
    case setCarWashes.actionType:
      return {
        ...state,
        carWashes: action.payload,
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
