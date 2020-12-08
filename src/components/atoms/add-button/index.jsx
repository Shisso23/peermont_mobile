import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../../theme/theme.colors';

const AddButton = ({ onPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      containerStyle={containerStyle}
      style={styles.touchableStyle}
    >
      <Icon name="plus" backgroundColor={colors.warning} size={20} color={colors.black} />
    </TouchableOpacity>
  );
};

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
};

AddButton.defaultProps = {
  containerStyle: {},
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddButton;
