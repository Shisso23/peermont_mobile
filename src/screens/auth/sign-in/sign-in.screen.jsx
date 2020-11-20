import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { RegisterLink, ResetPasswordLink } from '../../../components/atoms';
import { SignInForm } from '../../../components/forms';

import { userAuthService } from '../../../services';
import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { signInModel } from '../../../models';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { FormPageContainer } from '../../../components/containers';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const _onSignInSuccess = () => {
    const userPromise = dispatch(getUserAction());
    userPromise.then(() => {
      dispatch(setIsAuthenticatedAction(true));
    });
  };
  return (
    <FormPageContainer>
      <SignInForm
        submitForm={userAuthService.signIn}
        onSuccess={_onSignInSuccess}
        initialValues={signInModel()}
      />
      <RegisterLink containerStyle={styles.registerLink} />
      <ResetPasswordLink containerStyle={styles.forgotPasswordLink} />
    </FormPageContainer>
  );
};

const styles = StyleSheet.create({
  forgotPasswordLink: {
    marginBottom: 30,
  },
  registerLink: {
    marginVertical: 30,
  },
});

export default SignInScreen;
