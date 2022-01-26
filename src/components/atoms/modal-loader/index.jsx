import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import colors from '../../../../theme/theme.colors';

const ModalLoader = ({ isLoading }) => {
  return (
    <Modal
      isVisible={isLoading}
      hasBackdrop
      backdropOpacity={0.7}
      backdropColor={colors.whiteTransparent}
      animationIn="pulse"
      animationOut="pulse"
    >
      <ActivityIndicator animating size="large" color={colors.gold} />
    </Modal>
  );
};

ModalLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

ModalLoader.defaultProps = {};

export default ModalLoader;
