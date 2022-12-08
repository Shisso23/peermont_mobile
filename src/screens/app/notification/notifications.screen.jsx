import React from 'react';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { LoadingComponent, Notification } from '../../../components';
import { getNotification } from '../../../reducers/notification-reducer/notification.actions';
import { custom } from '../../../../theme/theme.styles';

const NotificationsScreen = () => {
  const { notification, isLoading } = useSelector((reducers) => reducers.notificationReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getNotification());
    }, []),
  );

  return !isLoading ? (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Inbox</Text>
        <Text style={custom.centerSubtitle}>Click to mark as read</Text>
      </PaddedContainer>
      {notification.map((message) => {
        return <Notification notification={message} key={_.get(message, 'id')} />;
      })}
    </ScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

NotificationsScreen.propTypes = {};

NotificationsScreen.defaultProps = {};

export default NotificationsScreen;
