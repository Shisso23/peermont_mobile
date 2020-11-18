import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../../screens/app/profile/profile.screen';

const Stack = createStackNavigator();
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Stack.Navigator>
);

export default AppNavigator;
