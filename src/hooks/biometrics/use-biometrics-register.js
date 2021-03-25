import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import _ from 'lodash';

import { createUserBiometricKey } from '../../reducers/user-auth-reducer/user-auth.actions';
import { biometricsAreAvailableAndKeyExists } from '../../helpers/biometrics.helper';
import { storageService } from '../../services';

export const useBiometricRegister = () => {
  const isSignedIn = useSelector((state) => state.userAuthReducer.isAuthenticated);
  const dispatch = useDispatch();

  function _getBiometricType(biometryType) {
    return _.isEmpty(biometryType) || _.isNil(biometryType) ? 'biometric' : biometryType;
  }

  function onRegisterBiometrics() {
    if (isSignedIn) {
      ReactNativeBiometrics.createKeys('Confirm fingerprint')
        .then((response) => {
          const { publicKey } = response;
          return dispatch(createUserBiometricKey(publicKey));
        })
        .then(() => {
          ReactNativeBiometrics.isSensorAvailable().then((response) => {
            const { biometryType } = response;
            Alert.alert(
              'Biometric Authentication Enabled',
              `${_.upperFirst(
                _getBiometricType(biometryType),
              )} login has been enabled successfully.`,
            );
          });
        });
    }
  }

  function onOptOutOfBiometrics() {
    return storageService.storeBiometricOtpOut(true.toString());
  }

  return () => {
    return biometricsAreAvailableAndKeyExists().then((response) => {
      const { keysExist, available, biometryType = false } = response;
      storageService.getBiometricOtpOut().then((userOptedOut) => {
        if (available && !keysExist && !userOptedOut) {
          Alert.alert(
            'Enable Biometric Authentication',
            `Do you want to enable ${_getBiometricType(biometryType)} login?`,
            [
              {
                text: 'No',
                style: 'cancel',
                onPress: onOptOutOfBiometrics,
              },
              { text: 'Yes', onPress: onRegisterBiometrics },
            ],
            { cancelable: true },
          );
        }
      });
    });
  };
};
