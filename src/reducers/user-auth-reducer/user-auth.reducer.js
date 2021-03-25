import CreateAction from '../action-utilities/action-creator';
import { signInModel } from '../../models';

const reducerName = 'user-auth';

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const setIsAuthenticated = CreateAction(reducerName, 'SET_IS_AUTHENTICATED');
export const setIsAuthenticatedAction = setIsAuthenticated.action;

const setTemporaryToken = CreateAction(reducerName, 'SET_TEMP_TOKEN');
export const setTemporaryTokenAction = setTemporaryToken.action;

const setResetPasswordFormData = CreateAction(reducerName, 'SET_RESET_PASSWORD_FORM_DATA');
export const setResetPasswordFormDataAction = setResetPasswordFormData.action;

const setSignInFormData = CreateAction(reducerName, 'SET_SIGN_IN_FORM_DATA');
export const setSignInFormDataAction = setSignInFormData.action;

const setBiometricPublicKey = new CreateAction(reducerName, 'SET_BIOMETRIC_PUBLIC_KEY');
export const setBiometricPublicKeyAction = setBiometricPublicKey.action;

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  resetPasswordFormData: null,
  signInFormData: signInModel(),
  biometricPublicKey: '',
};

export default function userAuthReducer(state = initialState, action) {
  switch (action.type) {
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
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
    case setBiometricPublicKey.actionType:
      return {
        ...state,
        biometricPublicKey: action.payload,
      };
    default:
      return state;
  }
}
