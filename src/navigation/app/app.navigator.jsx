import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './home/home.navigator';
import ProfileNavigator from './profile/profile.navigator';

const Drawer = createDrawerNavigator();
const AppNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeNavigator} />
    <Drawer.Screen name="Profile" component={ProfileNavigator} />
  </Drawer.Navigator>
);

export default AppNavigator;
