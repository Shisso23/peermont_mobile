import _ from 'lodash';

import notificationUrls from './notification.urls';
import userUrls from '../user-service/user.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { userUpdateSettingModel } from '../../../models';

export const getNotification = () => {
  const notificationUrl = notificationUrls.notificationUrl();
  const returnNotification = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(notificationUrl).then(returnNotification);
};

export const seeNotification = (notificationLinkId) => {
  const seeNotificationUrl = notificationUrls.seeNotificationUrl(notificationLinkId);
  return authNetworkService.get(seeNotificationUrl);
};

export const getHasUnseenNotification = () => {
  const hasUnseenNotificationUrl = notificationUrls.hasUnseenUrl();
  const returnHasUnseen = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(hasUnseenNotificationUrl).then(returnHasUnseen);
};

const updateNotificationSettings = (formData) => {
  const userUpdateSettingUrl = userUrls.updateDetailsUrl();
  const notificationUpdateModel = userUpdateSettingModel(formData);
  return authNetworkService.patch(userUpdateSettingUrl, notificationUpdateModel);
};

export default {
  getNotification,
  seeNotification,
  getHasUnseenNotification,
  updateNotificationSettings,
};
