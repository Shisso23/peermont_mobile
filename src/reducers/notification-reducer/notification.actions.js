import { setIsLoadingAction, setNotificationAction } from './notification.reducer';
import { notificationService } from '../../services';

export const getNotification = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return notificationService
      .getNotification()
      .then((notification) => dispatch(setNotificationAction(notification)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const seeNotification = (notificationLinkId) => {
  return () => notificationService.seeNotification(notificationLinkId);
};
