import { userAuthService, encryptionService } from '../../services';
import {
  setIsAuthenticatedAction,
  setTemporaryTokenAction,
  setResetPasswordFormDataAction,
} from './user-auth.reducer';

export const signOutAction = () => {
  return (dispatch) => {
    userAuthService.signOut().then(() => {
      dispatch(setIsAuthenticatedAction(false));
    });
  };
};

// ==========================================================
// Register
// ==========================================================
export const registerAction = ({ formData }) => {
  return (dispatch) => {
    const _storeTempararyToken = (token) => dispatch(setTemporaryTokenAction(token));
    const _getTemporaryToken = (encryptedPin) =>
      userAuthService.register({ encryptedPin, cardNumber: formData.cardNumber });

    return Promise.resolve(formData.pin)
      .then(encryptionService.encryptPin)
      .then(_getTemporaryToken)
      .then(_storeTempararyToken);
  };
};

export const registerResendOtpAction = () => {
  return (dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    const _storeTempararyToken = (newToken) => dispatch(setTemporaryTokenAction(newToken));
    return userAuthService.registerResendOtp(token).then(_storeTempararyToken);
  };
};

export const verifyRegisterOtpAction = (formData) => {
  return (dispatch, getState) => {
    const _storeTempararyToken = (token) => dispatch(setTemporaryTokenAction(token));
    const { token } = getState().userAuthReducer;
    return userAuthService.verifyRegisterOtp(formData, token).then(_storeTempararyToken);
  };
};

export const setPasswordAction = (formData) => {
  return (_dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    return userAuthService.setPassword(formData, token);
  };
};

// ==========================================================
// Reset Password
// ==========================================================

export const requestResetPasswordOtpAction = (formData) => {
  return (dispatch) => {
    dispatch(setResetPasswordFormDataAction(formData));
    const _storeTempararyToken = (token) => dispatch(setTemporaryTokenAction(token));
    return userAuthService.requestResetPasswordOtp(formData).then(_storeTempararyToken);
  };
};

export const resetPasswordResendOtpAction = () => {
  return (dispatch, getState) => {
    const { resetPasswordFormData } = getState().userAuthReducer;
    const _storeTempararyToken = (token) => dispatch(setTemporaryTokenAction(token));
    return userAuthService
      .requestResetPasswordOtp(resetPasswordFormData)
      .then(_storeTempararyToken);
  };
};

export const verifyResetPasswordOtpAction = (formData) => {
  return (dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    const _storeTempararyToken = (newToken) => dispatch(setTemporaryTokenAction(newToken));
    return userAuthService.verifyResetPasswordOtp(formData, token).then(_storeTempararyToken);
  };
};

export const resetPasswordAction = (formData) => {
  return (_dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    return userAuthService.resetPassword(formData, token);
  };
};
