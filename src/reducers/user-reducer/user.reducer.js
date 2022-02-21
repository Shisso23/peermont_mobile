import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';

const reducerName = 'user';

const setLoading = CreateAction(reducerName, 'SET_LOADING');
export const setLoadingAction = setLoading.action;

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;

const setOtpAutoFill = CreateAction(reducerName, 'SET_OTP_AUTO_FILL');
export const setOtpAutoFillAction = setOtpAutoFill.action;

const initialState = {
  loading: false,
  user: userModel(),
  otpAutoFill: false,
};

export const userSelector = (reducer) => reducer.userReducer;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setLoading.actionType:
      return {
        ...state,
        loading: action.payload,
      };
    case setUser.actionType:
      return {
        ...state,
        user: action.payload,
      };
    case setOtpAutoFill.actionType:
      return {
        ...state,
        otpAutoFill: action.payload,
      };
    default:
      return state;
  }
}
