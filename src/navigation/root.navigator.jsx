import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth/auth.navigator';
import AppNavigator from './app/app.navigator';

// Global Screens
import TermsAndConditionsScreen from '../screens/global/terms-and-conditions/terms-and-conditions.screen';

const RootStack = createStackNavigator();

const AppContainer = () => {
  const { isAuthenticated } = useSelector((reducer) => reducer.userAuthReducer);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="APP" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="AUTH" component={AuthNavigator} />
        )}
        <RootStack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionsScreen}
          options={{
            headerShown: true,
            title: 'Terms And Conditions',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
