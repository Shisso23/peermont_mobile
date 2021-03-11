import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../theme/theme.colors';

const DrawerIcon = ({ name }) => (
  <View style={styles.wrapper}>
    <Icon name={name} color={colors.white} size={styles.iconSize} />
  </View>
);

DrawerIcon.propTypes = {
  name: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  iconSize: 20,
  wrapper: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    width: 23,
  },
});
export default DrawerIcon;
