import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterLink, ResetPasswordLink } from '../../../components/atoms';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';
import { ResetPasswordLink, TextLink, Footer } from '../../../components/atoms';
import { SignInForm } from '../../../components/forms';

import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { FormPageContainer } from '../../../components/containers';
import { openUserPhoneApp } from '../../../helpers';
import config from '../../../config';
import {
  signInAction,
  loadSignInFormFromStorage,
} from '../../../reducers/user-auth-reducer/user-auth.actions';

const imageUri = require('../../../assets/images/header-alt.png');

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { signInFormData } = useSelector((reducers) => reducers.userAuthReducer);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(loadSignInFormFromStorage()).then(() => setLoading(false));
  }, []);

  const _handleFormSubmit = (formData) => {
    return dispatch(signInAction(formData));
  };

  const _onSignInSuccess = () => {
    const userPromise = dispatch(getUserAction());
    userPromise.then(() => {
      dispatch(setIsAuthenticatedAction(true));
    });
  };

  return (
    <FormPageContainer>
      <Image source={imageUri} resizeMode="contain" style={styles.imageStyle} />
      <Divider />
      <Divider />

      <SignInForm
        submitForm={userAuthService.signIn}
        onSuccess={_onSignInSuccess}
        initialValues={signInModel()}
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
