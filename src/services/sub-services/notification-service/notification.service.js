import _ from 'lodash';

import notificationUrls from './notification.urls';
import authNetworkService from '../auth-network-service/auth-network.service';

export const getNotification = () => {
  const notificationUrl = notificationUrls.notificationUrl();
  const returnNotification = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(notificationUrl).then(returnNotification);
};

export const seeNotification = (notificationLinkId) => {
  const seeNotificationUrl = notificationUrls.seeNotificationUrl(notificationLinkId);
  return authNetworkService.get(seeNotificationUrl);
};

export default {
  getNotification,
  seeNotification,
};
