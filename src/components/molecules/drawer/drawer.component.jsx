import React from 'react';

import { StyleSheet, View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-elements';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import DrawerIcon from './drawer-icon';
import colors from '../../../../theme/theme.colors';

const DrawerComponent = (props) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const safeAreaStyle = {
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };

  const _handleSignOut = () => {
    dispatch(signOutAction());
  };

  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView style={styles.drawerScrollStyle} {...props}>
        <DrawerItem
          key="Home"
          label="Home"
          icon={() => <DrawerIcon name="home" />}
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="My Account"
          icon={() => <DrawerIcon name="user" />}
          onPress={() => navigation.navigate('MyAccount')}
        />
        <DrawerItem
          label="Transactions"
          icon={() => <DrawerIcon name="history" />}
          onPress={() => navigation.push('Transactions')}
        />
        <DrawerItem
          label="Visit Palacebet"
          icon={() => <DrawerIcon name="link" />}
          onPress={() => navigation.push('PalaceBet')}
        />
        <DrawerItem
          label="Terms And Conditions"
          icon={() => <DrawerIcon name="file" />}
          onPress={() => navigation.push('TermsAndConditions')}
        />
        <DrawerItem
          label="Privacy Policy"
          icon={() => <DrawerIcon name="shield-alt" />}
          onPress={() => navigation.push('PrivacyPolicy')}
        />
      </DrawerContentScrollView>
      <View style={safeAreaStyle}>
        <DrawerItem
          label="Sign Out"
          icon={() => <DrawerIcon name="sign-out-alt" />}
          onPress={_handleSignOut}
        />
        <View style={styles.alignRow}>
          <Text style={styles.smallText}>{`Version ${getVersion()}`}</Text>
          <Text style={styles.smallText}>{`Build Number ${getBuildNumber()}`}</Text>
        </View>
      </View>
    </View>
  );
};

DrawerComponent.propTypes = {};

const styles = StyleSheet.create({
  alignRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  drawerScrollStyle: {
    marginTop: 20,
  },
  smallText: {
    color: colors.primary,
    fontSize: 12,
  },
  wrapper: {
    flex: 1,
  },
});

export default DrawerComponent;
