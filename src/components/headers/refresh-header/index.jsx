import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../../../theme/theme.colors';

const RefreshHeader = ({ refreshFunction, disable }) => {
  return (
    <TouchableOpacity onPress={refreshFunction} disable={disable}>
      <Icon
        type="font-awesome-5"
        name="redo-alt"
        size={16}
        color={colors.white}
        containerStyle={styles.iconContainerStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    marginRight: 10,
  },
});

RefreshHeader.propTypes = {
  refreshFunction: PropTypes.func.isRequired,
  disable: PropTypes.func,
};

RefreshHeader.defaultProps = {
  disable: false,
};

export default RefreshHeader;
