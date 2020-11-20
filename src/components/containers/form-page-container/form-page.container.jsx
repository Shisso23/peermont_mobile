import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FormPageContainer = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
});

FormPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormPageContainer;
