import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ResetPasswordLink, TextLink, Footer } from '../../../components/atoms';

import { SignInForm } from '../../../components/forms';

import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { FormPageContainer } from '../../../components/containers';
import { openUserPhoneApp } from '../../../helpers';
import config from '../../../config';
import { signInAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { loadAppDataForSignedInUserAction } from '../../../reducers/app-reducer/app.actions';

const imageUri = require('../../../assets/images/header-alt.png');

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { signInFormData } = useSelector((reducers) => reducers.userAuthReducer);

  const _handleFormSubmit = (formData) => {
    return dispatch(signInAction(formData));
  };

  const _onSignInSuccess = () => {
    RNBootSplash.show();
    dispatch(loadAppDataForSignedInUserAction())
      .then(() => {
        return dispatch(setIsAuthenticatedAction(true));
      })
      .finally(() => {
        RNBootSplash.hide({ fade: true });
      });
  };
  return (
    <FormPageContainer>
      <Image source={imageUri} resizeMode="contain" style={styles.imageStyle} />
      <Divider />
      <Divider />

      <SignInForm
        submitForm={_handleFormSubmit}
        onSuccess={_onSignInSuccess}
        initialValues={signInFormData}
      />
      <Divider />
      <Button title="Register" onPress={() => navigation.push('Register')} />

      <Divider />
      <ResetPasswordLink />

      <Divider />
      <TextLink
        title="Terms And Conditions"
        onPress={() => navigation.push('TermsAndConditions')}
      />

      <Divider />
      <TextLink title="Privacy Policy" onPress={() => navigation.push('PrivacyPolicy')} />

      <Divider />
      <TextLink
        title="Contact Call Centre - 011 928 1000"
        onPress={() => openUserPhoneApp(config.callCentreNumber)}
      />
      <Footer />
    </FormPageContainer>
  );
};
const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'center', height: 120 },
});

export default SignInScreen;
