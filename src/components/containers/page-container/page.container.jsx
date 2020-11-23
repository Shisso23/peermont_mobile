import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';

const PageContainer = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
});

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
