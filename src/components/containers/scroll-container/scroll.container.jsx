import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';

const ScrollContainer = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollContainer;
