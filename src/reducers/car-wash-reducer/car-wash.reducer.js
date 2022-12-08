import { voucherModel } from '../../models';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'carWash';

const setVouchers = CreateAction(reducerName, 'SET_VOUCHERS');
export const setVouchersAction = setVouchers.action;

const setVoucher = CreateAction(reducerName, 'SET_VOUCHER');
export const setVoucherAction = setVoucher.action;

const setMessages = CreateAction(reducerName, 'SET_MESSAGES');
export const setMessagesAction = setMessages.action;

const setCarWashes = CreateAction(reducerName, 'SET_CAR_WASHES');
export const setCarWashesAction = setCarWashes.action;

const setVoucherCount = CreateAction(reducerName, 'SET_VOUCHER_COUNT');
export const setVoucherCountAction = setVoucherCount.action;

const setCarDetails = CreateAction(reducerName, 'SET_CAR_DETAILS');
export const setCarDetailsAction = setCarDetails.action;

const setCarSuccess = CreateAction(reducerName, 'SET_CAR_SUCCESS');
export const setCarSuccessAction = setCarSuccess.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  vouchers: [],
  carWashes: [],
  isLoading: false,
  voucher: voucherModel,
  messages: {},
  voucherCount: {},
  carDetails: {},
  carSuccess: {},
};

export const carWashSelector = (reducers) => reducers.carWashReducer;

export const carWashReducer = (state = initialState, action) => {
  switch (action.type) {
    case setVouchers.actionType:
      return {
        ...state,
        vouchers: action.payload,
      };
    case setVoucher.actionType:
      return {
        ...state,
        voucher: action.payload,
      };
    case setMessages.actionType:
      return {
        ...state,
        messages: action.payload,
      };
    case setCarWashes.actionType:
      return {
        ...state,
        carWashes: action.payload,
      };
    case setVoucherCount.actionType:
      return {
        ...state,
        voucherCount: action.payload,
      };
    case setCarDetails.actionType:
      return {
        ...state,
        carDetails: action.payload,
      };
    case setCarSuccess.actionType:
      return {
        ...state,
        carSuccess: action.payload,
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

export default{
  carWashReducer,
}
