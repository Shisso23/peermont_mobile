import codePush from 'react-native-code-push';
import { getVersion } from 'react-native-device-info';
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

const getCodePushAppVersion = async () => {
  let appCodePushVersion;

  try {
    await codePush.getCurrentPackage().then((version) => {
      appCodePushVersion = _.get(version, 'label', 'v0');
    });
  } catch (e) {
    appCodePushVersion = null;
  }

  return appCodePushVersion;
};

const getAppVersion = async () => {
  let appVersion;

  try {
    appVersion = getVersion();
  } catch (e) {
    appVersion = null;
  }

  return appVersion;
};

export default {
  getAndroidVersion,
  getIOSVersion,
  getCodePushAppVersion,
  getAppVersion,
};
