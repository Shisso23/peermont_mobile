import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardScrollContainer = ({ children }) => {
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      {children}
    </KeyboardAwareScrollView>
  );
};

KeyboardScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeyboardScrollContainer;
