import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { HmsPushEvent, HmsPushMessaging } from '@hmscore/react-native-hms-push';
import AsyncStorage from '@react-native-community/async-storage';

import config from '../../config';

export const handleNotificationOpenedBackGround = () => {
  const navigation = useNavigation();

  const deeplinkTrasitioned = AsyncStorage.getItem(config.deeplinkTransition);

  return () => {
    DeviceInfo.hasHms().then((hasHms) => {
      if (hasHms) {
        HmsPushEvent.onNotificationOpenedApp((remoteMessage) => {
          if (!_.isEmpty(remoteMessage)) {
            if (_.isEqual(deeplinkTrasitioned, 'false')) navigation.navigate('Notifications');
          }
        });

        HmsPushMessaging.getInitialNotification().then((remoteMessage) => {
          if (!_.isEmpty(remoteMessage.result)) {
            navigation.navigate('Notifications');
          }
        });
      } else {
        messaging().onNotificationOpenedApp((remoteMessage) => {
          if (!_.isEmpty(remoteMessage)) {
            navigation.navigate('Notifications');
          }
        });

        messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            if (!_.isEmpty(remoteMessage)) {
              navigation.navigate('Notifications');
            }
          });
      }
    });
  };
};
