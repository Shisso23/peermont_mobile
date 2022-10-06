import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Linking, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeviceInfo, { getBuildNumber, getVersion } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import codePush from 'react-native-code-push';
import _ from 'lodash';

import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import DrawerIcon from './drawer-icon';
import appConfig from '../../../config';
import colors from '../../../../theme/theme.colors';
import { palaceBetIcon } from '../../../assets';
import variables from '../../../../theme/theme.variables';

const DrawerComponent = (props) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [codePushVersion, setCodePushVersion] = useState();
  const [storeUrl, setStoreUrl] = useState('');

  const safeAreaStyle = {
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };

  const _handleSignOut = () => {
    dispatch(signOutAction());
  };

  const getAppCenterCodeVersion = () => {
    codePush.getCurrentPackage().then((update) => {
      setCodePushVersion(_.get(update, 'label', 'v0'));
    });
  };

  const setStoreUrls = () => {
    DeviceInfo.hasHms().then((hasHms) => {
      if (hasHms) {
        setStoreUrl('');
      } else if (Platform.OS === 'ios') {
        setStoreUrl(appConfig.peermontHotelIosStoreUrl);
      } else {
        setStoreUrl(appConfig.peermontHotelAndroidStoreUrl);
      }
    });
  };

  const _openPeermontHotels = () => {
    Linking.openURL(storeUrl).then();
  };

  useEffect(() => {
    getAppCenterCodeVersion();
    setStoreUrls();
  }, []);

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
          label="Transactions"
          icon={() => <DrawerIcon name="history" />}
          onPress={() => navigation.navigate('Transactions')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Inbox"
          icon={() => <DrawerIcon name="bell" />}
          onPress={() => navigation.navigate('Notifications')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Car Wash"
          icon={() => <DrawerIcon name="car" />}
          onPress={() => navigation.navigate('CarWashHome')}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="Jackpot Look Up"
          icon={() => <DrawerIcon name="trophy" />}
          onPress={() => navigation.navigate('Home', { visible: true })}
          labelStyle={styles.labelStyle}
        />
        <DrawerItem
          label="PalaceBet"
          icon={() => (
            <Image source={palaceBetIcon} style={styles.palaceBetSize} width={22} height={21} />
          )}
          onPress={() => Linking.openURL(appConfig.palaceBetLink)}
          labelStyle={styles.labelStyle}
        />
        {_.isEmpty(storeUrl) ? null : (
          <DrawerItem
            label="Peermont Hotels"
            icon={() => <DrawerIcon name="bed" />}
            onPress={_openPeermontHotels}
            labelStyle={styles.labelStyle}
          />
        )}
        <DrawerItem
          label="T&C’s"
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
        <DrawerItem
          label="Contact Us"
          icon={() => <DrawerIcon name="phone-alt" />}
          onPress={() => navigation.navigate('ContactUs')}
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
          <Text style={styles.smallText}>{`Code Version ${codePushVersion}`}</Text>
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
    fontWeight: 'normal',
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
