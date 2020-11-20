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
  apiResetPasswordOtpModel,
  resetPasswordOtpModel,
  apiResetPasswordSetPasswordModel,
  resetPasswordSetPasswordModel,
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

const register = ({ formData }) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiMembershipCardModel(formData);
  return networkService.post(registerUrl, apiModel).catch((err) => {
    err.errors = membershipCardModel(err.errors);
    return Promise.reject(err);
  });
};

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
  const apiModel = apiResetPasswordOtpModel(formData, otpToken);
  return networkService
    .post(verifyResetPasswordOtpUrl, apiModel)
    .then(_extractAndReturnTokenFromApiResponse)
    .catch((err) => {
      err.errors = resetPasswordOtpModel(err.errors);
      return Promise.reject(err);
    });
};

const resetPassword = (formData, token) => {
  const resetPasswordUrl = authUrls.resetPasswordUrl();
  const apiModel = apiResetPasswordSetPasswordModel(formData, token);
  return networkService.post(resetPasswordUrl, apiModel).catch((err) => {
    err.errors = resetPasswordSetPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

const doTokensExistInLocalStorage = () => {
  const _trueIfBothExist = (accessToken, refreshToken) => {
    return !_.isNull(accessToken) && !_.isNull(refreshToken);
  };
  return authUtils.getAccessAndRefreshTokens().then(([accessToken, refreshToken]) => {
    return _trueIfBothExist(accessToken, refreshToken);
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
};
