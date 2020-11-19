import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../../screens/app/home/home.screen';
import { BarsComponent } from '../../../components/atoms';

const Stack = createStackNavigator();
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerLeft: () => <BarsComponent /> }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
  </Stack.Navigator>
);

export default AppNavigator;
