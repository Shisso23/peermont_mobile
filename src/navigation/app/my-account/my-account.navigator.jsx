import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen from '../../../screens/app/my-account/my-account.screen';

const Stack = createStackNavigator();
const MyAccountNavigator = () => (
  <Stack.Navigator initialRouteName="MyAccount">
    <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ title: 'MyAccount' }} />
  </Stack.Navigator>
);

export default MyAccountNavigator;
