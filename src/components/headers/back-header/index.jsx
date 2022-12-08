import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

import colors from '../../../../theme/theme.colors';

const BackHeader = (props) => {
  return (
    <TouchableOpacity {...props}>
      <Icon
        type="font-awesome-5"
        name="caret-left"
        size={20}
        color={colors.white}
        containerStyle={styles.iconContainerStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    paddingRight: 4,
    width: 30,
  },
});

BackHeader.propTypes = {};

BackHeader.defaultProps = {};

export default BackHeader;
