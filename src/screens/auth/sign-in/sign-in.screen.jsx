import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements';
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
      <Divider />
      <RegisterLink />
      <Divider />
      <ResetPasswordLink />
    </FormPageContainer>
  );
};

export default SignInScreen;
