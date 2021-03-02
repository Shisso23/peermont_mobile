import React from 'react';
import { View, Modal, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../../../../theme/theme.colors';

const { width: screenWidth } = Dimensions.get('window');
const exampleCard = require('../../../assets/images/example-membership-card.png');

const RegisterCardModal = ({ visible, setModalVisible }) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <TouchableOpacity onPress={setModalVisible} style={styles.closeIconContainer}>
        <Icon name="times" color={colors.white} size={20} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image resizeMode="contain" source={exampleCard} style={styles.cardImage} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: screenWidth * 0.9,
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: colors.cardInfoBackGroundGrey,
    flex: 1,
    justifyContent: 'center',
  },
  closeIcon: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  modalView: {
    alignItems: 'center',
  },
});

RegisterCardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

RegisterCardModal.defaultProps = {};

export default RegisterCardModal;
