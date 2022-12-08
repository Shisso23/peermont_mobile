/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { Text } from '@rneui/themed';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';

import { notificationSettingUpdateAction } from '../../../reducers/notification-reducer/notification.actions';
import { PaddedContainer } from '../../containers';
import config from '../../../config';
import { custom } from '../../../../theme/theme.styles';

const PushNotificationSettings = () => {
  const [hasEnabledPushNotifications, setHasEnabledPushNotifications] = useState();
  const { user } = useSelector((reducers) => reducers.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    loadPushNotificationSetting();
  }, []);

  const toggleSwitch = (value) => {
    if (value) {
      onEnablePushNotifications();
    } else {
      onDisablePushNotifications();
    }
  };

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
    await messaging().requestPermission();
    await AsyncStorage.setItem(config.fcmEnabled, 'true');
  };

  const onDisablePushNotifications = async () => {
    setPushNotificationAction(false);
    await AsyncStorage.setItem(config.fcmEnabled, 'false');
    await AsyncStorage.removeItem(config.fcmTokenKey);
  };

  return (
    <PaddedContainer>
      <View style={custom.rowAlign}>
        <Text h4>Push Notifications</Text>
        <View style={custom.settingsContainer}>
          <Switch onValueChange={toggleSwitch} value={hasEnabledPushNotifications} />
        </View>
      </View>
    </PaddedContainer>
  );
};

export default PushNotificationSettings;
