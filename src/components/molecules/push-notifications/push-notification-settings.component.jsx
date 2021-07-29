/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import { notificationSettingUpdateAction } from '../../../reducers/notification-reducer/notification.actions';
import {
  updateFirebaseToken,
  updatePushKitToken,
} from '../../../reducers/user-reducer/user.actions';
import config from '../../../config';

const PushNotificationSettings = () => {
  const [hasEnabledPushNotifications, setHasEnabledPushNotifications] = useState();
  const { user } = useSelector((reducers) => reducers.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    loadPushNotificationSetting();
  }, []);

  function toggleSwitch(value) {
    if (value) {
      onEnablePushNotifications();
    } else {
      onDisablePushNotifications();
    }
  }

  const loadPushNotificationSetting = async () => {
    if (user.optInNotifications) {
      setHasEnabledPushNotifications(true);
    } else {
      setHasEnabledPushNotifications(false);
    }
  };

  const togglePushNotifications = (opt_in_push_notifications) => {
    const pushNotificationSettingData = {
      opt_in_push_notifications,
    };
    dispatch(notificationSettingUpdateAction(pushNotificationSettingData));
  };

  const setPushNotificationAction = (enabled) => {
    setHasEnabledPushNotifications(enabled);
    togglePushNotifications(enabled);
  };

  const onEnablePushNotifications = async () => {
    setPushNotificationAction(true);
    DeviceInfo.hasHms().then(async (hasHms) => {
      if (hasHms) {
        await AsyncStorage.setItem(config.pushKitEnabled, 'true');
        dispatch(updatePushKitToken());
      } else {
        await messaging().requestPermission();
        await AsyncStorage.setItem(config.fcmEnabled, 'true');
        dispatch(updateFirebaseToken());
      }
    });
  };

  const onDisablePushNotifications = async () => {
    setPushNotificationAction(false);
    DeviceInfo.hasHms().then(async (hasHms) => {
      if (hasHms) {
        await AsyncStorage.setItem(config.pushKitEnabled, 'false');
        await AsyncStorage.removeItem(config.pushKitTokenKey);
      } else {
        await AsyncStorage.setItem(config.fcmEnabled, 'false');
        await AsyncStorage.removeItem(config.fcmTokenKey);
      }
    });
  };

  return (
    <View style={styles.settingsContainer}>
      <>
        <Switch onValueChange={toggleSwitch} value={hasEnabledPushNotifications} />
      </>
    </View>
  );
};

export default PushNotificationSettings;

PushNotificationSettings.propTypes = {};

const styles = StyleSheet.create({
  settingsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
