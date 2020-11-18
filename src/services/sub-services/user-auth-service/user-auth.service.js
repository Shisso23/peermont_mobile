import _ from 'lodash';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  apiRegistrationUserModel,
  registrationUserModel,
  apiForgotPasswordModel,
  forgotPasswordModel,
  apiSignInModel,
} from '../../../models';

const signIn = ({ formData }) => {
  const signInUrl = authUrls.tokenUrl();
  const apiModel = apiSignInModel(formData);
  const oAuthData = authUtils.constructOAuthSignInData(apiModel);
  return networkService.post(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const signOut = () => {
  // any other signOut logic
  return authUtils.removeAccessAndRefreshTokens();
};

const register = ({ formData }) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiRegistrationUserModel(formData);
  return networkService.post(registerUrl, apiModel).catch((err) => {
    err.errors = registrationUserModel(err.errors);
    return Promise.reject(err);
  });
};

const forgotPassword = ({ formData }) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const apiModel = apiForgotPasswordModel(formData);

  return networkService.post(forgotPasswordUrl, apiModel).catch((err) => {
    err.errors = forgotPasswordModel(err.errors);
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
  forgotPassword,
  doTokensExistInLocalStorage,
};
