import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import colors from '../../../../theme/theme.colors';

const RefreshHeader = ({ refreshFunction, disabled }) => {
  return (
    <>
      {!disabled && (
        <TouchableOpacity onPress={refreshFunction} disabled={disabled}>
          <Icon
            type="font-awesome-5"
            name="redo-alt"
            size={16}
            color={colors.white}
            containerStyle={styles.iconContainerStyle}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    marginRight: 15,
  },
});

RefreshHeader.propTypes = {
  refreshFunction: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

RefreshHeader.defaultProps = {
  disabled: false,
};

export default RefreshHeader;
