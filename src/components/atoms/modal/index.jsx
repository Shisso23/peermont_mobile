import React from 'react';
import { View, Modal as RNModal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';

const Modal = ({
  children,
  visible,
  setModalVisible,
  hasCloseButton,
  closeButtonSize,
  closeButtonColor,
  transparent,
  backgroundFade,
  backgroundFadeColor,
}) => {
  const backgroundFadeStyle = { backgroundColor: backgroundFadeColor };

  return (
    <RNModal animationType="fade" transparent={transparent} visible={visible}>
      {hasCloseButton && (
        <TouchableOpacity
          onPress={setModalVisible}
          style={styles.closeIconContainer}
          hitSlop={custom.hitSlop}
        >
          <Icon name="times" color={closeButtonColor} size={closeButtonSize} />
        </TouchableOpacity>
      )}
      <View style={[styles.centeredView, backgroundFade ? backgroundFadeStyle : null]}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  closeIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 30,
    justifyContent: 'center',
    margin: 20,
    marginHorizontal: 10,
    position: 'absolute',
    right: 0,
    top: 10,
    width: 30,
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
  closeButtonColor: PropTypes.string,
  closeButtonSize: PropTypes.number,
  transparent: PropTypes.bool,
  backgroundFade: PropTypes.bool,
  backgroundFadeColor: PropTypes.string,
};

Modal.defaultProps = {
  setModalVisible: () => null,
  hasCloseButton: false,
  closeButtonColor: colors.white,
  closeButtonSize: 20,
  transparent: false,
  backgroundFade: false,
  backgroundFadeColor: colors.cardInfoBackGroundGrey,
};

export default Modal;
