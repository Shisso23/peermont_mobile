import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View } from 'react-native';
import { Divider, Button, ListItem, Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNBootSplash from 'react-native-bootsplash';
import { getVersion } from 'react-native-device-info';

import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { Footer, Contact, ModalLoader } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { signInAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { loadAppDataForSignedInUserAction } from '../../../reducers/app-reducer/app.actions';
import { useBiometricLogin, useAuthentication } from '../../../hooks';
import { imageUri } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';
import { flashService } from '../../../services';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const biometricLogin = useBiometricLogin();
  const { authenticate } = useAuthentication();

  const [biometricIsAvailable, setBiometricIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signInFormData } = useSelector((reducers) => reducers.userAuthReducer);

  const _checkForBiometrics = async () => {
    const { available } = await ReactNativeBiometrics.isSensorAvailable();
    const { keysExist } = await ReactNativeBiometrics.biometricKeysExist();

    setBiometricIsAvailable(available && keysExist);
  };

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _handleAuthFinally = () => {
    setIsLoading(false);
  };

  const _handleBiometricLogin = () => {
    setIsLoading(true);
    return biometricLogin().then((success) => {
      if (success) {
        authenticate(_continueToApp, _handleAuthFinally);
      } else {
        flashService.error('Biometric failed, please login with your password', 4000, false);
        _handleNumberReset(true);
        _handleAuthFinally();
      }
    });
  };

  const _handleFormSubmit = (formData) => {
    setIsLoading(true);
    return dispatch(signInAction(formData));
  };

  const _onSignInSuccess = () => {
    setIsLoading(false);
    if (Platform.OS === 'android') RNBootSplash.show();
    dispatch(loadAppDataForSignedInUserAction())
      .then(() => {
        return dispatch(setIsAuthenticatedAction(true));
      })
      .finally(() => {
        if (Platform.OS === 'android') RNBootSplash.hide({ fade: true });
      });
  };

  const _onSignInFailure = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    _checkForBiometrics().then();
  }, [ReactNativeBiometrics.biometricKeysExist()]);

  const _handleNumberReset = (resetNumber) => {
    if (resetNumber) {
      ReactNativeBiometrics.deleteKeys().then(setBiometricIsAvailable(false));
    }
  };

  return (
    <KeyboardScrollContainer>
      <ModalLoader isLoading={isLoading} />
      <PaddedContainer>
        <Image source={imageUri} resizeMode="contain" style={styles.imageStyle} />
        <Text style={custom.centerSubtitle}>Enter your details below to log in.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <SignInForm
          submitForm={_handleFormSubmit}
          onSuccess={_onSignInSuccess}
          onFailure={_onSignInFailure}
          initialValues={signInFormData}
          onMobileNumberClear={_handleNumberReset}
        />
      </PaddedContainer>
      {biometricIsAvailable && (
        <PaddedContainer>
          <Button title="Biometric Login" onPress={_handleBiometricLogin} />
        </PaddedContainer>
      )}
      <PaddedContainer>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </PaddedContainer>
      <Divider />
      <ListItem onPress={() => navigation.navigate('ResetPassword')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Reset Password</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('TermsAndConditions')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Terms And Conditions</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('PrivacyPolicy')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Privacy Policy</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Contact />
      <Divider />
      <View style={custom.alignRow}>
        <Text style={custom.smallText}>{`Version ${getVersion()}`}</Text>
      </View>
      <Footer />
    </KeyboardScrollContainer>
  );
};
const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'center', height: 120, marginBottom: 10, marginTop: 20 },
});

export default SignInScreen;
