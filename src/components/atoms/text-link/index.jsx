import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import { Text } from 'react-native-elements';

const TextLink = ({ title, containerStyle, onPress }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.alignCenter} delayPressIn={0} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
TextLink.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

TextLink.defaultProps = {
  containerStyle: {},
  onPress: () => null,
};

export default TextLink;
