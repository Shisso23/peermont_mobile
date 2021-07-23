import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { HmsLocalNotification, HmsPushInstanceId } from '@hmscore/react-native-hms-push';

import config from '../../../config';
import FlashService from '../flash-service/flash.service';

const getAndSetToken = async () => {
  let pushKitToken = await AsyncStorage.getItem(config.pushKitTokenKey);
  const pushKitEnabled = await AsyncStorage.getItem(config.pushKitEnabled);

  if (!pushKitEnabled) {
    await AsyncStorage.setItem(config.pushKitEnabled, 'true');
  }

  if (pushKitEnabled) {
    if (!pushKitToken) {
      await HmsPushInstanceId.getToken('')
        .then((token) => {
          pushKitToken = token.result;
        })
        .catch(() => {
          pushKitToken = null;
        });
      if (pushKitToken) {
        await AsyncStorage.setItem(config.pushKitTokenKey, pushKitToken);
      }
    }
  }

  return pushKitToken;
};

const processMessage = async (remoteMessage) => {
  const message = JSON.parse(remoteMessage);
  const pushKitEnabled = await AsyncStorage.getItem(config.pushKitEnabled);

  const title = _.get(message, 'title', 'Peermont');
  const body = _.get(message, 'message');
  if (pushKitEnabled === 'true') {
    FlashService.inbox(title, body);
  }
};

const handleBackGroundMessage = async (dataMessage) => {
  const pushKitEnabled = await AsyncStorage.getItem(config.pushKitEnabled);
  const message = JSON.parse(dataMessage.data);
  if (pushKitEnabled === 'true') {
    HmsLocalNotification.localNotification({
      [HmsLocalNotification.Attr.title]: message.title,
      [HmsLocalNotification.Attr.message]: message.message,
    });
  }
};

export default {
  getAndSetToken,
  processMessage,
  handleBackGroundMessage,
};
