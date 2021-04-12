import React from 'react';
import { Image, StyleSheet, View, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import DrawerIcon from './drawer-icon';
import appConfig from '../../../config';
import colors from '../../../../theme/theme.colors';
import variables from '../../../../theme/theme.variables';

const palaceBetIcon = require('../../../assets/images/palace-bet.png');

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
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="My Account"
          icon={() => <DrawerIcon name="user" />}
          onPress={() => navigation.navigate('MyAccount')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="My Profile"
          icon={() => <DrawerIcon name="user-circle" />}
          onPress={() => navigation.navigate('MyProfile')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Mobile App Transactions"
          icon={() => <DrawerIcon name="history" />}
          onPress={() => navigation.navigate('Transactions')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Notifications"
          icon={() => <DrawerIcon name="bell" />}
          onPress={() => navigation.navigate('Notifications')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Visit PalaceBet"
          icon={() => (
            <Image source={palaceBetIcon} style={styles.palaceBetSize} width={22} height={21} />
          )}
          onPress={() => Linking.openURL(appConfig.palaceBetLink)}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Terms And Conditions"
          icon={() => <DrawerIcon name="file" />}
          onPress={() => navigation.navigate('TermsAndConditions')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Privacy Policy"
          icon={() => <DrawerIcon name="shield-alt" />}
          onPress={() => navigation.navigate('PrivacyPolicy')}
          labelStyle={styles.labelStyle}
        />
      </DrawerContentScrollView>
      <View style={safeAreaStyle}>
        <DrawerItem
          label="Sign Out"
          icon={() => <DrawerIcon name="sign-out-alt" />}
          onPress={_handleSignOut}
          labelStyle={styles.labelStyle}
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
  labelStyle: {
    color: colors.white,
    fontFamily: variables.fontFamily,
  },
  palaceBetSize: {
    height: 23,
    width: 24,
  },
  smallText: {
    color: colors.white,
    fontSize: 12,
  },
  wrapper: {
    backgroundColor: colors.darkGrey,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
});

export default DrawerComponent;
