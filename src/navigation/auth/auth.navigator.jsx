import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';
import ForgotPasswordScene from '../../screens/auth/forgot-password/forgot-password.screen';
import RegisterScene from '../../screens/auth/register/register.screen';
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
        name="ForgotPassword"
        component={ForgotPasswordScene}
        options={{ title: 'Forgot Password' }}
      />
      <AuthStack.Screen name="Register" component={RegisterScene} options={{ title: 'Register' }} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
