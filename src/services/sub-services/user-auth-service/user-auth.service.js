import _ from 'lodash';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  resetPasswordModel,
  apiSignInModel,
  apiMembershipCardModel,
  membershipCardModel,
  apiResetPasswordModel,
  apiOtpModel,
  otpModel,
  apiSetPasswordModel,
  setPasswordModel,
} from '../../../models';

const _extractAndReturnTokenFromApiResponse = (apiResponse) =>
  _.get(apiResponse, 'data.token', null);

const signIn = ({ formData }) => {
  const signInUrl = authUrls.tokenUrl();
  const apiModel = apiSignInModel(formData);
  const oAuthData = authUtils.constructOAuthSignInData(apiModel);
  return networkService.post(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const signOut = () => {
  // any other signOut logic
  const signOutUrl = authUrls.signOutUrl();
  return authNetworkService.delete(signOutUrl).then(authUtils.removeAccessAndRefreshTokens);
};

const doTokensExistInLocalStorage = () => {
  const _trueIfBothExist = (accessToken, refreshToken) => {
    return !_.isNull(accessToken) && !_.isNull(refreshToken);
  };
  return authUtils.getAccessAndRefreshTokens().then(([accessToken, refreshToken]) => {
    return _trueIfBothExist(accessToken, refreshToken);
  });
};

// ==========================================================
// Register
// ==========================================================
const register = (formData) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiMembershipCardModel(formData);
  return networkService
    .post(registerUrl, apiModel)
    .then(_extractAndReturnTokenFromApiResponse)
    .catch((err) => {
      err.errors = membershipCardModel(err.errors);
      return Promise.reject(err);
    });
};

const verifyRegisterOtp = (formData, token) => {
  const verifyRegisterOtpUrl = authUrls.verifyRegisterOtpUrl();
  const apiModel = otpModel(formData, token);
  return networkService
    .post(verifyRegisterOtpUrl, apiModel)
    .then(_extractAndReturnTokenFromApiResponse)
    .catch((err) => {
      err.errors = otpModel(err.errors);
      return Promise.reject(err);
    });
};

const setPassword = (formData, token) => {
  const setPasswordUrl = authUrls.setPasswordUrl();
  const apiModel = apiSetPasswordModel(formData, token);
  return networkService.post(setPasswordUrl, apiModel).catch((err) => {
    err.errors = setPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

// ==========================================================
// Reset Password
// ==========================================================
const requestResetPasswordOtp = (formData) => {
  const requestResetPasswordOtpUrl = authUrls.requestResetPasswordOtpUrl();
  const apiModel = apiResetPasswordModel(formData);
  return networkService
    .post(requestResetPasswordOtpUrl, apiModel)
    .then(_extractAndReturnTokenFromApiResponse)
    .catch((err) => {
      err.errors = resetPasswordModel(err.errors);
      return Promise.reject(err);
    });
};

const verifyResetPasswordOtp = (formData, otpToken) => {
  const verifyResetPasswordOtpUrl = authUrls.verifyResetPasswordOtpUrl();
  const apiModel = apiOtpModel(formData, otpToken);
  return networkService
    .post(verifyResetPasswordOtpUrl, apiModel)
    .then(_extractAndReturnTokenFromApiResponse)
    .catch((err) => {
      err.errors = otpModel(err.errors);
      return Promise.reject(err);
    });
};

const resetPassword = (formData, token) => {
  const resetPasswordUrl = authUrls.resetPasswordUrl();
  const apiModel = apiSetPasswordModel(formData, token);
  return networkService.post(resetPasswordUrl, apiModel).catch((err) => {
    err.errors = setPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

export default {
  signIn,
  signOut,
  register,
  requestResetPasswordOtp,
  doTokensExistInLocalStorage,
  verifyResetPasswordOtp,
  resetPassword,
  verifyRegisterOtp,
  setPassword,
};
