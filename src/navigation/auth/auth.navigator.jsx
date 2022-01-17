import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';

import RegisterSetPasswordScreen from '../../screens/auth/register/set-password/register-set-password.screen';
import RegisterScreen from '../../screens/auth/register/register.screen';
import RegisterOtpScreen from '../../screens/auth/register/register-otp/register-otp.screen';
import RegisterErrorScreen from '../../screens/auth/register/register-error/register-error';
import RegisterEmailScreen from '../../screens/auth/register/register-email/register-email.screen';
import RegisterEmailCompleteScreen from '../../screens/auth/register/register-email/register-email-complete.screen';

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
          headerShown: false,
          title: '',
        }}
      />

      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: '' }} />

      <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen name="RegisterOtp" component={RegisterOtpScreen} options={{ title: '' }} />
      <AuthStack.Screen
        name="RegisterSetPassword"
        component={RegisterSetPasswordScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="RegisterEmail"
        component={RegisterEmailScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="RegisterEmailComplete"
        component={RegisterEmailCompleteScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="RegisterError"
        component={RegisterErrorScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="ResetPasswordOtp"
        component={ResetPasswordOtpScreen}
        options={{ title: '' }}
      />
      <AuthStack.Screen
        name="ResetPasswordSetPassword"
        component={ResetPasswordSetPasswordScreen}
        options={{ title: '' }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
