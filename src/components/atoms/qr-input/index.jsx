import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import { qrModel } from '../../../models';
import { QrInputForm } from '../../forms';
import { carWashSelector } from '../../../reducers/car-wash-reducer/car-wash.reducer';
import { claimCarWashVoucherAction } from '../../../reducers/car-wash-reducer/car-wash.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const { width: screenWidth } = Dimensions.get('window');

const QrInputModal = ({ visible, closeModal }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { voucher, messages } = useSelector(carWashSelector);
  const { user } = useSelector(userSelector);
  const _closeModal = () => {
    closeModal(false);
  };

  const _submitForm = (formData) => {
    if (!_.isEmpty(formData)) {
      dispatch(
        claimCarWashVoucherAction(
          user.cmpAccountNumber,
          user.tierName,
          formData.qrCode,
          voucher.id,
        ),
      );
      setActive(true);
    }
  };

  useEffect(() => {
    if (active) {
      if (!_.isEmpty(messages)) {
        closeModal(false);
        if (messages.succeeded) {
          navigation.navigate('CarWashSuccess');
        } else {
          navigation.navigate('CarWashFailure');
        }
      }
    }
  }, [messages]);

  return (
    <>
      <Modal
        avoidKeyboard
        isVisible={visible}
        hasBackdrop
        backdropOpacity={0.7}
        backdropColor={colors.primary}
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
            <Text style={custom.modalCenterTitle}>Enter QR Code</Text>
            <Divider />
            <Text style={custom.centerSubtitle}>Please enter the car wash branch code</Text>
            <Divider />
            <QrInputForm submitForm={_submitForm} initialValues={qrModel()} />
          </View>
        </View>
      </Modal>
    </>
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

QrInputModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

QrInputModal.defaultProps = {};

export default QrInputModal;
