import _ from 'lodash';
import {
  setIsLoadingAction,
  setNotificationAction,
  setHasUnseenAction,
} from './notification.reducer';
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

export const hasIncomingNotification = () => {
  return (dispatch) => {
    return notificationService
      .getHasUnseenNotification()
      .then((hasUnseen) => dispatch(setHasUnseenAction(_.get(hasUnseen, 'has_unseen'))));
  };
};

export const notificationSettingUpdateAction = (formData) => {
  return () => {
    return notificationService.updateNotificationSettings(formData);
  };
};

export const seeNotification = (notificationLinkId) => {
  return (dispatch) =>
    notificationService
      .seeNotification(notificationLinkId)
      .then(() => dispatch(hasIncomingNotification()));
};
