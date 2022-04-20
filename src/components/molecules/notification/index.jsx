import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Icon, ListItem, Text } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import { useDispatch } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';

import PropTypes from 'prop-types';
import {
  seeNotification,
  deleteNotification,
} from '../../../reducers/notification-reducer/notification.actions';
import { TrashButton } from '../../atoms';
import { promptConfirmDelete } from '../../../helpers/prompt.helper';

const Notification = ({ notification }) => {
  const dispatch = useDispatch();

  const notificationLinkId = _.get(notification, 'id');
  const message = _.get(notification, 'message');
  const seen = _.get(notification, 'seen');
  const sentAt = Moment(_.get(notification, 'sent_at')).format('YYYY/MM/DD, HH:mm');

  const [needsCollapse, setNeedsCollapse] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSeen, setIsSeen] = useState(seen);
  const [isDeleting, setDeleting] = useState(false);

  const _handleCollapse = () => {
    if (!isSeen) {
      dispatch(seeNotification(notificationLinkId));
      setIsSeen(true);
    }
    setIsCollapsed(!isCollapsed);
  };

  const _handleNeedForCollapse = ({ nativeEvent: { lines } }) => {
    if (lines.length > 1) {
      setNeedsCollapse(true);
    }
  };

  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteNotification(notificationLinkId));
    });
  };

  const _renderCollapseText = () => (
    <>
      <Collapsible collapsed={isCollapsed} collapsedHeight={20}>
        <ListItem.Title>{message}</ListItem.Title>
      </Collapsible>
    </>
  );

  const _renderText = () => <Text onTextLayout={_handleNeedForCollapse}>{message}</Text>;

  return (
    <ListItem onPress={_handleCollapse} bottomDivider>
      <ListItem.Content>
        {needsCollapse ? _renderCollapseText() : _renderText()}
        <ListItem.Subtitle>{sentAt}</ListItem.Subtitle>
      </ListItem.Content>
      {needsCollapse && isSeen && (
        <Icon
          name={isCollapsed ? 'chevron-down' : 'chevron-up'}
          type="font-awesome-5"
          size={15}
          containerStyle={styles.chevronContainer}
        />
      )}
      {!isSeen && <Badge status="error" />}
      <TrashButton onPress={_handleDelete} loading={isDeleting} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  chevronContainer: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

Notification.propTypes = {
  notification: PropTypes.object,
};

Notification.defaultProps = {
  notification: {},
};

export default Notification;
