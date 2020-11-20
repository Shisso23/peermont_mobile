import { userAuthService } from '../../services';
import { setIsAuthenticatedAction, setTemporaryTokenAction } from './user-auth.reducer';

export const signOutAction = () => {
  return (dispatch) => {
    userAuthService.signOut().then(() => {
      dispatch(setIsAuthenticatedAction(false));
    });
  };
};

export const registerAction = ({ formData }) => {
  return userAuthService.register({ formData }).then((_res) => {
    // store token here
  });
};

export const requestResetPasswordOtpAction = (formData) => {
  return (dispatch) => {
    return userAuthService.requestResetPasswordOtp(formData).then((token) => {
      dispatch(setTemporaryTokenAction(token));
    });
  };
};

export const verifyResetPasswordOtpAction = (formData) => {
  return (dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    return userAuthService.verifyResetPasswordOtp(formData, token).then((newToken) => {
      dispatch(setTemporaryTokenAction(newToken));
    });
  };
};

export const resetPasswordAction = (formData) => {
  return (_dispatch, getState) => {
    const { token } = getState().userAuthReducer;
    return userAuthService.resetPassword(formData, token);
  };
};
