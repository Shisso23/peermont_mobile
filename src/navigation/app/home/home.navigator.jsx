import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../../screens/app/home/home.screen';

const Stack = createStackNavigator();
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
  </Stack.Navigator>
);

export default AppNavigator;
