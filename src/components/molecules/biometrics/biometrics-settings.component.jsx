import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import _ from 'lodash';

import { createUserBiometricKey } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { storageService } from '../../../services';
import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';

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
    <PaddedContainer>
      <View style={custom.rowAlign}>
        <Text h4>Biometric Login</Text>
        <View style={custom.settingsContainer}>
          {isAvailable ? (
            <Switch onValueChange={toggleSwitch} value={hasRegisteredForBiometrics} />
          ) : (
            <Text styles={custom.settingsText}>Not available</Text>
          )}
        </View>
      </View>
    </PaddedContainer>
  );
};

export default BiometricSettings;
