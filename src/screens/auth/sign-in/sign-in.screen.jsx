import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Divider, Button, ListItem, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNBootSplash from 'react-native-bootsplash';

import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { Footer, Contact, Modal, LoadingComponent } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { signInAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { loadAppDataForSignedInUserAction } from '../../../reducers/app-reducer/app.actions';
import { useBiometricLogin, useAuthentication } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

const imageUri = require('../../../assets/images/header-alt.png');

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
    return biometricLogin().then(() => {
      authenticate(_continueToApp, _handleAuthFinally);
    });
  };

  const _handleFormSubmit = (formData) => {
    setIsLoading(true);
    return dispatch(signInAction(formData));
  };

  const _onSignInSuccess = () => {
    setIsLoading(false);
    RNBootSplash.show();
    dispatch(loadAppDataForSignedInUserAction())
      .then(() => {
        return dispatch(setIsAuthenticatedAction(true));
      })
      .finally(() => {
        RNBootSplash.hide({ fade: true });
      });
  };

  const _onSignInFailure = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    _checkForBiometrics().then();
  }, []);

  return (
    <KeyboardScrollContainer>
      <Modal
        visible={isLoading}
        transparent
        backgroundFade
        backgroundFadeColor={colors.whiteTransparent}
      >
        <LoadingComponent hasBackground={false} />
      </Modal>
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
      <Footer />
    </KeyboardScrollContainer>
  );
};
const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'center', height: 120, marginTop: 20, marginBottom: 10 },
});

export default SignInScreen;
