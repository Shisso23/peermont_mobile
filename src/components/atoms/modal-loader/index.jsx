import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Modal from '../modal';

import colors from '../../../../theme/theme.colors';

const ModalLoader = ({ isLoading }) => {
  return (
    <Modal
      visible={isLoading}
      transparent
      backgroundFade
      backgroundFadeColor={colors.whiteTransparent}
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
