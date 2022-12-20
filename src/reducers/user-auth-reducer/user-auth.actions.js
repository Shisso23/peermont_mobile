import _ from 'lodash';

import { userAuthService, encryptionService, storageService, appService } from '../../services';
import {
  setIsAuthenticatedAction,
  setTemporaryTokenAction,
  setResetPasswordFormDataAction,
  setSignInFormDataAction,
  setIsLoadingAction,
  setUnconfirmedEmailAction,
} from './user-auth.reducer';
import { forgetCardPin } from '../membership-card-reducer/membership-card.actions';
import { parseMobile } from '../../models/auth/auth-utils/auth.utils';

export const signInAction = (formData) => {
  return (dispatch) => {
    return userAuthService
      .signIn(formData)
      .then(() => storageService.storeSignInForm(formData))
      .then(() => dispatch(setSignInFormDataAction(formData)))
  };
};

export const updateSignInMobileNumberAction = (mobileNumber) => {
  return (dispatch) => {
    return storageService.getSignInForm().then((formData) => {
      formData.mobileNumber = mobileNumber;
      storageService.storeSignInForm(formData);
      dispatch(setSignInFormDataAction(formData));
    });
  };
};

export const signOutAction = () => {
  return (dispatch) => {
    dispatch(forgetCardPin());

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
      .then(() => dispatch(setSignInFormDataAction(formData)))
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
  return async (dispatch) => {
    dispatch(setIsLoadingAction(true));
    const deviceInfo = await appService.getDeviceInfo();

    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));
    const _getTemporaryToken = (encryptedPin) =>
      userAuthService.register({
        encryptedPin,
        cardNumber: formData.cardNumber,
        manufacturer: deviceInfo.manufacturer,
        device_os: deviceInfo.device_os,
        os_version: deviceInfo.os_version,
        device_model: deviceInfo.device_model,
      });

    return Promise.resolve(formData.pin)
      .then((pin) => encryptionService.encryptPin(formData.cardNumber, pin))
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
    const _storeTemporaryToken = (token) => dispatch(setTemporaryTokenAction(token));

    const { token } = getState().userAuthReducer;
    return userAuthService
      .setPassword(formData, token)
      .then(_storeTemporaryToken)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const registerEmailAction = (formData) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

    const { token } = getState().userAuthReducer;
    return userAuthService
      .setEmail(formData, token)
      .then(dispatch(setUnconfirmedEmailAction(formData.unconfirmed_email)))
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
