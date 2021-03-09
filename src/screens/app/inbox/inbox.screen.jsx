import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { ScrollContainer } from '../../../components/containers';
import { LoadingComponent, Inbox } from '../../../components';
import { getInbox } from '../../../reducers/inbox-reducer/inbox.actions';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

const InboxScreen = () => {
  const { inbox, isLoading } = useSelector((reducers) => reducers.inboxReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getInbox());
    }, []),
  );

  return !isLoading ? (
    <ScrollContainer>
      <Text style={[custom.centerSubtitle, styles.helpText]}>Click to read</Text>
      {inbox.map((message) => {
        return <Inbox inbox={message} key={_.get(message, 'id')} />;
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

InboxScreen.propTypes = {};

InboxScreen.defaultProps = {};

export default InboxScreen;
