import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';

import RegisterSetPasswordScreen from '../../screens/auth/register/set-password/register-set-password.screen';
import RegisterScreen from '../../screens/auth/register/register.screen';
import RegisterOtpScreen from '../../screens/auth/register/register-otp/register-otp.screen';

import ResetPasswordOtpScreen from '../../screens/auth/reset-password/reset-password-otp/reset-password-otp.screen';
import ResetPasswordSetPasswordScreen from '../../screens/auth/reset-password/set-password/reset-password-set-password.screen';
import ResetPasswordScreen from '../../screens/auth/reset-password/reset-password.screen';

import { globalScreenOptions } from '../../../theme/theme.styles';

const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={globalScreenOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />

      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
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
