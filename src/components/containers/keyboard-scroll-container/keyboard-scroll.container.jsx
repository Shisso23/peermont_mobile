import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../../../theme/theme.colors';

const KeyboardScrollContainer = ({ children }) => {
  return (
    <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

KeyboardScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeyboardScrollContainer;
