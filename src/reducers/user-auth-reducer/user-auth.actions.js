import { userAuthService, encryptionService } from '../../services';
import {
  setIsAuthenticatedAction,
  setTemporaryTokenAction,
  setResetPasswordFormDataAction,
  setSignInFormDataAction,
} from './user-auth.reducer';
import storageService from '../../services/sub-services/storage-service/storage.service';

export const signInAction = (formData) => {
  return (dispatch) => {
    return userAuthService
      .signIn(formData)
      .then(() => storageService.storeSignInForm(formData))
      .then(() => dispatch(setSignInFormDataAction(formData)));
  };
};

export const signOutAction = () => {
  return (dispatch) => {
    return userAuthService.signOut().then(() => {
      return dispatch(setIsAuthenticatedAction(false));
    });
  };
};

export const loadSignInFormFromStorage = () => {
  return (dispatch) => {
    return storageService.getSignInForm().then((signInForm) => {
      if (signInForm) {
        dispatch(setSignInFormDataAction(signInForm));
      }
    });
  };
};

// ==========================================================
// Register
// ==========================================================
export const registerAction = ({ formData }) => {
  return (dispatch) => {
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    const _getTemporaryToken = (encryptedPin) =>
      userAuthService.register({ encryptedPin, cardNumber: formData.cardNumber });

    return Promise.resolve(formData.pin)
      .then(encryptionService.encryptPin)
      .then(_getTemporaryToken)
      .then(_storeTemporaryToken);
  };
};

export const registerResendOtpAction = () => {
  return (dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    const _storeTemporaryToken = (newToken) => dispatch(setTemporaryTokenAction(newToken));
    return userAuthService.registerResendOtp(token).then(_storeTemporaryToken);
  };
};

export const verifyRegisterOtpAction = (formData) => {
  return (dispatch, getState) => {
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    const { token } = getState().userAuthReducer;
    return userAuthService.verifyRegisterOtp(formData, token).then(_storeTemporaryToken);
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
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    return userAuthService.requestResetPasswordOtp(formData).then(_storeTemporaryToken);
  };
};

export const resetPasswordResendOtpAction = () => {
  return (dispatch, getState) => {
    const { resetPasswordFormData } = getState().userAuthReducer;
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    return userAuthService
      .requestResetPasswordOtp(resetPasswordFormData)
      .then(_storeTemporaryToken);
  };
};

export const verifyResetPasswordOtpAction = (formData) => {
  return (dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    const _storeTemporaryToken = (newToken) => dispatch(setTemporaryTokenAction(newToken));
    return userAuthService.verifyResetPasswordOtp(formData, token).then(_storeTemporaryToken);
  };
};

export const resetPasswordAction = (formData) => {
  return (_dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    return userAuthService.resetPassword(formData, token);
  };
};
