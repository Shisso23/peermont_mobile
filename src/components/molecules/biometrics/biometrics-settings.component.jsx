import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import _ from 'lodash';

import { createUserBiometricKey } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { storageService } from '../../../services';

const BiometricSettings = () => {
  const isSignedIn = useSelector((state) => state.userAuthReducer.isAuthenticated);
  const [hasRegisteredForBiometrics, setHasRegisteredForBiometrics] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    ReactNativeBiometrics.isSensorAvailable().then((response) => {
      if (isMounted) setIsAvailable(_.get(response, 'available'));
    });
    ReactNativeBiometrics.biometricKeysExist().then((response) => {
      if (isMounted) setHasRegisteredForBiometrics(_.get(response, 'keysExist'));
    });
    return () => {
      isMounted = false;
    };
  }, []);

  function toggleSwitch(value) {
    if (value) {
      onRegisterBiometrics();
    } else {
      onDeregisterBiometrics();
    }
  }

  function onRegisterBiometrics() {
    if (!hasRegisteredForBiometrics && isSignedIn) {
      return ReactNativeBiometrics.createKeys('Confirm fingerprint').then((resultObject) => {
        const { publicKey } = resultObject;

        setHasRegisteredForBiometrics(true);
        storageService.storeBiometricOtpOut(false.toString());

        return dispatch(createUserBiometricKey(publicKey));
      });
    }

    return Promise.resolve(false);
  }

  function onDeregisterBiometrics() {
    if (hasRegisteredForBiometrics && isSignedIn) {
      return ReactNativeBiometrics.deleteKeys().then((resultObject) => {
        const { keysDeleted } = resultObject;
        if (keysDeleted) {
          setHasRegisteredForBiometrics(false);
          storageService.storeBiometricOtpOut(true.toString());
        }
      });
    }

    return Promise.resolve(false);
  }

  return (
    <View style={styles.settingsContainer}>
      {isAvailable && (
        <>
          <Text>{hasRegisteredForBiometrics ? 'Enabled' : 'Disabled'}</Text>
          <Switch onValueChange={toggleSwitch} value={hasRegisteredForBiometrics} />
        </>
      )}
      {!isAvailable && (
        <>
          <Text styles={styles.settingsText}>Biometric Login is currently not available.</Text>
        </>
      )}
    </View>
  );
};

export default BiometricSettings;

BiometricSettings.propTypes = {};

const styles = StyleSheet.create({
  settingsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsText: {
    marginHorizontal: 10,
  },
});
