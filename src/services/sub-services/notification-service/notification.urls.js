import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  notificationUrl: () => `${apiUrl}/notifications/`,
  seeNotificationUrl: (notificationLinkId) =>
    `${apiUrl}/notifications/see?notification_link_id=${notificationLinkId}`,
};
