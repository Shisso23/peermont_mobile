import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Button, ListItem, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Footer, Contact } from '../../../components/atoms';

import { SignInForm } from '../../../components/forms';

import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
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
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Image source={imageUri} resizeMode="contain" style={styles.imageStyle} />
      </PaddedContainer>
      <PaddedContainer>
        <SignInForm
          submitForm={_handleFormSubmit}
          onSuccess={_onSignInSuccess}
          initialValues={signInFormData}
        />
      </PaddedContainer>
      <PaddedContainer>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </PaddedContainer>
      <Divider />
      <PaddedContainer>
        <Text h4>Forgot your password?</Text>
      </PaddedContainer>
      <ListItem onPress={() => navigation.navigate('ResetPassword')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Reset Password</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Divider />
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
      <PaddedContainer>
        <Text h4>Need help?</Text>
      </PaddedContainer>
      <Contact />
      <Divider />
      <Footer />
    </KeyboardScrollContainer>
  );
};
const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'center', height: 120 },
});

export default SignInScreen;
