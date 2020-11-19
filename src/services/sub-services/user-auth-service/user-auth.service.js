import _ from 'lodash';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiForgotPasswordModel,
  forgotPasswordModel,
  apiSignInModel,
  apiMembershipCardModel,
  membershipCardModel,
} from '../../../models';

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
