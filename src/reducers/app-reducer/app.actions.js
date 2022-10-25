import { Alert, Linking, Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';
import moment from 'moment';
import _ from 'lodash';

import { getUserAction } from '../user-reducer/user.actions';
import { loadAllFormDataAction } from '../form-data-reducer/form-data.actions';
import { loadSignInFormFromStorage } from '../user-auth-reducer/user-auth.actions';
import { storageService, appService } from '../../services';
import config from '../../config';

export const loadAppDataAction = () => {
  return (dispatch) => {
    return Promise.all([dispatch(loadSignInFormFromStorage())]);
  };
};

const openStore = () => {
  const storeUrl = Platform.OS === 'ios' ? config.iosStoreUrl : config.androidStoreUrl;
  Linking.openURL(storeUrl).then();
};

const convertVersionToNumber = (version) => Number(_.join(_.split(version, '.'), ''));

const checkForStoreUpdates = () => async () => {
  const key = 'checkedAppVersionToday';
  const today = moment();
  const checkedToday = await storageService.getItem(key);

  if (!_.isNull(checkedToday) && today.isSame(moment(checkedToday), 'day')) {
    return Promise.all([]);
  }

  const storeVersion =
    Platform.OS === 'ios' ? await appService.getIOSVersion() : await appService.getAndroidVersion();

  if (!_.isNull(storeVersion)) {
    if (convertVersionToNumber(storeVersion) > convertVersionToNumber(getVersion())) {
      Alert.alert('New update available on the Store!', '', [{ text: 'Ok', onPress: openStore }]);
    }

    await storageService.saveItem(key, moment(today));
  }

  return Promise.all([]);
};

export const loadAppDataForSignedInUserAction = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(getUserAction()),
      dispatch(loadAllFormDataAction()),
      dispatch(loadSignInFormFromStorage()),
      dispatch(checkForStoreUpdates()),
    ]);
  };
};
