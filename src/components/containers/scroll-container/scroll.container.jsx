import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import colors from '../../../../theme/theme.colors';

const ScrollContainer = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollContainer;
