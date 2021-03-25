import ReactNativeBiometrics from 'react-native-biometrics';
import _ from 'lodash';

export const BIOMETRIC_USER_OPTED_OUT_KEY = 'biometric_user_opted_out';

export const biometricsAreAvailableAndKeyExists = () => {
  return Promise.all([
    ReactNativeBiometrics.isSensorAvailable(),
    ReactNativeBiometrics.biometricKeysExist(),
  ]).then((responses = []) => {
    const { available = false } = _.nth(responses, 0) || {};
    const { keysExist = false } = _.nth(responses, 1) || {};

    return { available, keysExist };
  });
};
