import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const PaddedContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
});

PaddedContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaddedContainer;
