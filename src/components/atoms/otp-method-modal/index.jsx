import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import ModalLoader from '../modal-loader';
import {
  sendUserEmailOtpAction,
  resendUpdateMobileOtpAction,
} from '../../../reducers/user-reducer/user.actions';
import {
  sendPaymentOtpAction,
  sendPaymentEmailOtpAction,
} from '../../../reducers/payments-reducer/payments.actions';
import { paymentSelector } from '../../../reducers/payments-reducer/payments.reducer';
import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth } = Dimensions.get('window');

const OtpMethodModal = ({ closeModal, switchBackToNumericModal, verificationType }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(paymentSelector);

  const _closeModal = () => {
    closeModal(false);
  };

  const _switchModalEmail = () => {
    switch (verificationType) {
      case 'PAYMENT':
        return dispatch(sendPaymentEmailOtpAction('')).then(switchBackToNumericModal('EMAIL'));
      case 'UPDATE_PROFILE':
        return dispatch(sendUserEmailOtpAction('')).then(switchBackToNumericModal('EMAIL'));
      default:
        return null;
    }
  };

  const _switchModalSMS = () => {
    switch (verificationType) {
      case 'PAYMENT':
        return dispatch(sendPaymentOtpAction('')).then(switchBackToNumericModal('SMS'));
      case 'UPDATE_PROFILE':
        return dispatch(resendUpdateMobileOtpAction()).then(switchBackToNumericModal('SMS'));
      default:
        return null;
    }
  };

  return isLoading ? (
    <ModalLoader isLoading={isLoading} />
  ) : (
    <Modal
      avoidKeyboard
      hasBackdrop
      backdropOpacity={0.7}
      backdropColor={colors.primary}
      isVisible
      animationIn="pulse"
      animationOut="pulse"
    >
      <View style={custom.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={_closeModal}
            style={custom.closeIconContainer}
            hitSlop={custom.hitSlop}
          >
            <Icon name="times" color={colors.gold} size={22} />
          </TouchableOpacity>
          <Text style={custom.modalCenterTitle}>OTP METHOD</Text>
          <Text style={custom.modalCenterSubtitle}>
            Please select one of the following, to receive your OTP:
          </Text>
          <Divider />
          <TouchableOpacity style={custom.modalButton} onPress={_switchModalEmail}>
            <Text style={custom.modalButtonText}>EMAIL</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={custom.modalButton} onPress={_switchModalSMS}>
            <Text style={custom.modalButtonText}>SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 30,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: screenWidth * 0.9,
  },
});

OtpMethodModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  switchBackToNumericModal: PropTypes.func.isRequired,
  verificationType: PropTypes.string.isRequired,
};

OtpMethodModal.defaultProps = {};

export default OtpMethodModal;
