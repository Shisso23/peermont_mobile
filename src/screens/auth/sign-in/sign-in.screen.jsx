import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { RegisterLink, ForgotPasswordLink } from '../../../components/atoms';
import { SignInForm } from '../../../components/forms';

import { userAuthService } from '../../../services';
import { setIsAuthenticatedAction } from '../../../reducers/user-auth-reducer/user-auth.reducer';
import { signInModel } from '../../../models';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const _onSignInSuccess = () => {
    const userPromise = dispatch(getUserAction());
    userPromise.then(() => {
      dispatch(setIsAuthenticatedAction(true));
    });
  };
  return (
    <>
      <SignInForm
        submitForm={userAuthService.signIn}
        onSuccess={_onSignInSuccess}
        initialValues={signInModel({ mobileNumber: '0824776117', password: '0987' })}
      />
      <RegisterLink containerStyle={styles.registerLink} />
      <ForgotPasswordLink containerStyle={styles.forgotPasswordLink} />
    </>
  );
};

const styles = StyleSheet.create({
  forgotPasswordLink: {
    marginBottom: 30,
  },
  pageWrapper: {
    flexGrow: 1,
  },
  placeHolder: {
    flexGrow: 0.6,
  },
  registerLink: {
    marginVertical: 20,
  },
});

export default SignInScreen;
