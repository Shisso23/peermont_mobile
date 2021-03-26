import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const FormContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
