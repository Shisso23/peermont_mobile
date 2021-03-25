import _ from 'lodash';

import { userAuthService, encryptionService, storageService } from '../../services';
import {
  setIsAuthenticatedAction,
  setTemporaryTokenAction,
  setResetPasswordFormDataAction,
  setSignInFormDataAction,
  setIsLoadingAction,
} from './user-auth.reducer';
import { updateFirebaseToken } from '../user-reducer/user.actions';
import { parseMobile } from '../../models/auth/auth-utils/auth.utils';

export const signInAction = (formData) => {
  return (dispatch) => {
    return userAuthService
      .signIn(formData)
      .then(() => storageService.storeSignInForm(formData))
      .then(() => dispatch(setSignInFormDataAction(formData)))
      .then(() => dispatch(updateFirebaseToken()));
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

export const signInWithBiometricsAction = (signature) => {
  return (dispatch, getState) => {
    const { signInFormData } = getState().userAuthReducer;
    const formData = {
      mobileNumber: parseMobile(
        _.get(signInFormData, 'mobileNumber'),
        _.get(signInFormData, 'callingCode'),
      ),
      password: signature,
    };
    return userAuthService
      .signIn(formData)
      .then(() => storageService.storeSignInForm(formData))
      .then(() => dispatch(setSignInFormDataAction(formData)));
  };
};

export const createUserBiometricKey = (publicKey) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return userAuthService
      .createUserBiometricKey(publicKey)
      .then((response) => {
        return _.get(response, 'data', {});
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

// ==========================================================
// Register
// ==========================================================
export const registerAction = ({ formData }) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    const _getTemporaryToken = (encryptedPin) =>
      userAuthService.register({ encryptedPin, cardNumber: formData.cardNumber });

    return Promise.resolve(formData.pin)
      .then(encryptionService.encryptPin)
      .then(_getTemporaryToken)
      .then(_storeTemporaryToken)
      .finally(() => dispatch(setIsLoadingAction(false)));
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
    dispatch(setIsLoadingAction(true));

    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    const { token } = getState().userAuthReducer;
    return userAuthService
      .verifyRegisterOtp(formData, token)
      .then(_storeTemporaryToken)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const setPasswordAction = (formData) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

    const { token } = getState().userAuthReducer;
    return userAuthService
      .setPassword(formData, token)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

// ==========================================================
// Reset Password
// ==========================================================

export const requestResetPasswordOtpAction = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    dispatch(setResetPasswordFormDataAction(formData));
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    return userAuthService
      .requestResetPasswordOtp(formData)
      .then(_storeTemporaryToken)
      .finally(() => dispatch(setIsLoadingAction(false)));
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
    dispatch(setIsLoadingAction(true));

    const { token } = getState().userAuthReducer;
    const _storeTemporaryToken = (newToken) => dispatch(setTemporaryTokenAction(newToken));
    return userAuthService
      .verifyResetPasswordOtp(formData, token)
      .then(_storeTemporaryToken)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const resetPasswordAction = (formData) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

    const { token } = getState().userAuthReducer;
    return userAuthService
      .resetPassword(formData, token)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
