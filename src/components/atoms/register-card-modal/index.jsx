import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

const { width: screenWidth } = Dimensions.get('window');
const exampleCard = require('../../../assets/images/example-membership-card.png');

const RegisterCardModal = ({ visible, setModalVisible }) => {
  return (
    <Modal
      transparent
      backgroundFade
      hasCloseButton
      visible={visible}
      setModalVisible={setModalVisible}
    >
      <Image resizeMode="contain" source={exampleCard} style={styles.cardImage} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: screenWidth * 0.9,
  },
});

RegisterCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

RegisterCardModal.defaultProps = {};

export default RegisterCardModal;
