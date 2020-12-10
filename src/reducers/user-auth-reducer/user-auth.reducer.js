import CreateAction from '../action-utilities/action-creator';
import { signInModel } from '../../models';

const reducerName = 'user-auth';

const setIsAuthenticated = CreateAction(reducerName, 'SET_IS_AUTHENTICATED');
export const setIsAuthenticatedAction = setIsAuthenticated.action;

const setTemporaryToken = CreateAction(reducerName, 'SET_TEMP_TOKEN');
export const setTemporaryTokenAction = setTemporaryToken.action;

const setResetPasswordFormData = CreateAction(reducerName, 'SET_RESET_PASSWORD_FORM_DATA');
export const setResetPasswordFormDataAction = setResetPasswordFormData.action;

const setSignInFormData = CreateAction(reducerName, 'SET_SIGN_IN_FORM_DATA');
export const setSignInFormDataAction = setSignInFormData.action;

const initialState = {
  isAuthenticated: false,
  token: null,
  resetPasswordFormData: null,
  signInFormData: signInModel(),
};

export default function userAuthReducer(state = initialState, action) {
  switch (action.type) {
    case setIsAuthenticated.actionType:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case setTemporaryToken.actionType:
      return {
        ...state,
        token: action.payload,
      };
    case setResetPasswordFormData.actionType:
      return {
        ...state,
        resetPasswordFormData: action.payload,
      };
    case setSignInFormData.actionType:
      return {
        ...state,
        signInFormData: signInModel(action.payload),
      };
    default:
      return state;
  }
}
