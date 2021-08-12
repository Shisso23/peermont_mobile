import _ from 'lodash';

import authNetworkService from '../auth-network-service/auth-network.service';
import appUrls from './app.urls';

const _getVersion = (url) =>
  authNetworkService
    .get(url)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.version', null);
    })
    .catch((error) => {
      return Promise.reject(error);
    });

const getAndroidVersion = () => {
  const url = appUrls.androidVersionUrl();

  return _getVersion(url);
};

const getIOSVersion = () => {
  const url = appUrls.iosVersionUrl();

  return _getVersion(url);
};

export default {
  getAndroidVersion,
  getIOSVersion,
};
