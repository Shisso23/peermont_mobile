import React from 'react';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../../../../theme/theme.colors';

const AddButton = ({ onPress, containerStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      containerStyle={containerStyle}
      style={styles.touchableStyle}
    >
      {!disabled && (
        <Icon name="plus" backgroundColor={colors.warning} size={20} color={colors.black} />
      )}
    </TouchableOpacity>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
};

AddButton.defaultProps = {
  containerStyle: {},
  disabled: false,
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddButton;
