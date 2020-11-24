import React from 'react';

import { StyleSheet, View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const DrawerComponent = (props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const safeArea = {
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };
  const _handleSignout = () => {
    dispatch(signOutAction());
  };

  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView style={styles.drawerScrollStyle} {...props}>
        <DrawerItem key="Home" label="Home" onPress={() => navigation.navigate('Home')} />
        <DrawerItem label="My Account" onPress={() => navigation.navigate('MyAccount')} />
        {/* <DrawerItem label="Inbox" onPress={() => navigation.navigate('Profile')} /> */}
        {/* <DrawerItem label="Terms and Conditions" onPress={() => navigation.navigate('Profile')} /> */}
        <DrawerItem label="Sign Out" onPress={_handleSignout} />
      </DrawerContentScrollView>
      <View style={safeArea} />
    </View>
  );
};

DrawerComponent.propTypes = {};

const styles = StyleSheet.create({
  drawerScrollStyle: {
    marginTop: 20,
  },
  wrapper: {
    flex: 1,
  },
});

export default DrawerComponent;
