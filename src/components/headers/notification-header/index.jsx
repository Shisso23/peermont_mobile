import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Badge } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import colors from '../../../../theme/theme.colors';

const NotificationHeader = () => {
  const navigation = useNavigation();
  const { hasUnseen } = useSelector((reducers) => reducers.notificationReducer);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Icon
          type="font-awesome-5"
          name="bell"
          size={20}
          color={colors.white}
          containerStyle={styles.iconContainerStyle}
        />

        {hasUnseen && <Badge containerStyle={styles.badgeContainerStyle} />}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  badgeContainerStyle: {
    position: 'absolute',
    right: 12,
    top: -6,
  },
  iconContainerStyle: {
    marginRight: 15,
  },
});

NotificationHeader.propTypes = {};

NotificationHeader.defaultProps = {};

export default NotificationHeader;
