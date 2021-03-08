import React from 'react';
import { View, Modal as RNModal, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../../../../theme/theme.colors';

const Modal = ({
  children,
  visible,
  setModalVisible,
  hasCloseButton,
  transparent,
  backgroundFade,
}) => {
  return (
    <RNModal animationType="fade" transparent={transparent} visible={visible}>
      {hasCloseButton && (
        <TouchableOpacity onPress={setModalVisible} style={styles.closeIconContainer}>
          <Icon name="times" color={colors.white} size={20} style={styles.closeIcon} />
        </TouchableOpacity>
      )}
      <View style={[styles.centeredView, backgroundFade ? styles.backgroundFade : null]}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backgroundFade: {
    backgroundColor: colors.cardInfoBackGroundGrey,
  },
  centeredView: {
    alignItems: 'center',
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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func,
  hasCloseButton: PropTypes.bool,
  transparent: PropTypes.bool,
  backgroundFade: PropTypes.bool,
};

Modal.defaultProps = {
  setModalVisible: () => {},
  hasCloseButton: false,
  transparent: false,
  backgroundFade: false,
};

export default Modal;
