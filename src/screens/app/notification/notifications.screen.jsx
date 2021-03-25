import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { ScrollContainer } from '../../../components/containers';
import { LoadingComponent, Notification } from '../../../components';
import { getNotification } from '../../../reducers/notification-reducer/notification.actions';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

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
      <Text style={[custom.centerSubtitle, styles.helpText]}>Click to mark as read</Text>
      {notification.map((message) => {
        return <Notification notification={message} key={_.get(message, 'id')} />;
      })}
    </ScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

const styles = StyleSheet.create({
  helpText: {
    color: colors.gold,
    padding: 5,
  },
});

NotificationsScreen.propTypes = {};

NotificationsScreen.defaultProps = {};

export default NotificationsScreen;
