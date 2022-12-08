import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import AuthNavigator from './auth/auth.navigator';
import AppNavigator from './app/app.navigator';
import linking from '../linking';

const RootStack = createStackNavigator();

const AppContainer = () => {
  const { isAuthenticated } = useSelector((reducer) => reducer.userAuthReducer);

  const onReady = () => RNBootSplash.hide({ fade: true });

  return (
    <NavigationContainer linking={linking} onReady={onReady}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="APP" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="AUTH" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
