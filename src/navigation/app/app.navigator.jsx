import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './home/home.navigator';
import { DrawerComponent } from '../../components/molecules';
import MyAccountNavigator from './my-account/my-account.navigator';

const Drawer = createDrawerNavigator();
const AppNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />}>
    <Drawer.Screen name="Home" component={HomeNavigator} />
    <Drawer.Screen name="MyAccount" component={MyAccountNavigator} />
  </Drawer.Navigator>
);

export default AppNavigator;
