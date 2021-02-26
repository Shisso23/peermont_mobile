import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';

import RegisterSetPasswordScreen from '../../screens/auth/register/set-password/register-set-password.screen';
import RegisterScreen from '../../screens/auth/register/register.screen';
import RegisterOtpScreen from '../../screens/auth/register/register-otp/register-otp.screen';
import RegisterErrorScreen from '../../screens/auth/register/register-error/register-error';

import ResetPasswordOtpScreen from '../../screens/auth/reset-password/reset-password-otp/reset-password-otp.screen';
import ResetPasswordSetPasswordScreen from '../../screens/auth/reset-password/set-password/reset-password-set-password.screen';
import ResetPasswordScreen from '../../screens/auth/reset-password/reset-password.screen';

import { globalScreenOptions } from '../../../theme/theme.styles';
import TermsAndConditionsScreen from '../../screens/global/terms-and-conditions/terms-and-conditions.screen';
import PrivacyPolicyScreen from '../../screens/global/privacy-policy/privacy-policy.screen';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={globalScreenOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Login',
        }}
      />

      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />

      <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: 'Terms And Conditions' }}
      />
      <AuthStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Privacy Policy' }}
      />
      <AuthStack.Screen
        name="RegisterOtp"
        component={RegisterOtpScreen}
        options={{ title: 'Register Otp' }}
      />
      <AuthStack.Screen
        name="RegisterSetPassword"
        component={RegisterSetPasswordScreen}
        options={{ title: 'Create Password' }}
      />
      <AuthStack.Screen
        name="RegisterError"
        component={RegisterErrorScreen}
        options={{ title: 'Register Error' }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <AuthStack.Screen
        name="ResetPasswordOtp"
        component={ResetPasswordOtpScreen}
        options={{ title: 'Otp' }}
      />
      <AuthStack.Screen
        name="ResetPasswordSetPassword"
        component={ResetPasswordSetPasswordScreen}
        options={{ title: 'New Password' }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
