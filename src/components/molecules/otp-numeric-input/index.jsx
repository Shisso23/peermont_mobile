import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { ModalLoader, OtpMethodModal } from '../../atoms';
import { otpModel } from '../../../models';
import NumericalInputForm from '../../forms/numerical-input/numerical-input.form';
import {
  sendPaymentOtpAction,
  verifyPaymentOtpAction,
} from '../../../reducers/payments-reducer/payments.actions';
import {
  verifyRegisterOtpAction,
  registerResendOtpAction,
  verifyResetPasswordOtpAction,
  resetPasswordResendOtpAction,
  updateSignInMobileNumberAction,
} from '../../../reducers/user-auth-reducer/user-auth.actions';
import {
  verifyUpdateMobileOtpAction,
  resendUpdateMobileOtpAction,
  verifyUpdateEmailOtpAction,
  getUserAction,
} from '../../../reducers/user-reducer/user.actions';
import { otpMessage } from '../../../helpers/otp-message.helper';
import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import config from '../../../config';

const { width: screenWidth } = Dimensions.get('window');

const OtpNumericInput = ({
  visible,
  setModalVisible,
  afterOtpRoute,
  verificationType,
  userData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((reducers) => reducers.userReducer);
  const [showOtpMethodModal, setShowOtpMethodModal] = useState(false);
  const [otpMethod, setOtpMethod] = useState('SMS');
  const [unconfirmedMobileNumber, setUnconfirmedMobileNumber] = useState('');
  const [unconfirmedEmail, setUnconfirmedEmaill] = useState('');
  const [otpSetting, setOtpSetting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadOtpSetting();
    if (userData) {
      setUnconfirmedMobileNumber(_.get(userData, 'unconfirmed_mobile_number'));
      setUnconfirmedEmaill(_.get(userData, 'unconfirmed_email'));
    }
  }, []);

  const loadOtpSetting = async () => {
    setOtpSetting(_.isEqual(await AsyncStorage.getItem(config.otpAutofill), 'true'));
  };

  const _handleFormSubmission = (formData) => {
    switch (verificationType) {
      case 'PAYMENT':
        return dispatch(verifyPaymentOtpAction(formData));
      case 'REGISTER':
        return dispatch(verifyRegisterOtpAction(formData));
      case 'UPDATE_MOBILE_NUMBER':
        if (!_.isUndefined(unconfirmedEmail)) {
          return dispatch(verifyUpdateEmailOtpAction(formData));
        }
        return dispatch(verifyUpdateMobileOtpAction(formData));
      case 'RESET_PASSWORD':
        return dispatch(verifyResetPasswordOtpAction(formData));
      default:
        return null;
    }
  };

  const _handleFormSuccess = () => {
    switch (verificationType) {
      case 'PAYMENT':
        navigation.replace(afterOtpRoute);
        break;
      case 'REGISTER':
        navigation.replace('RegisterSetPassword');
        break;
      case 'UPDATE_MOBILE_NUMBER':
        if (!_.isUndefined(unconfirmedEmail)) {
          _closeModal();
        }
        return dispatch(getUserAction()).then(
          dispatch(updateSignInMobileNumberAction(unconfirmedMobileNumber))
            .then(_closeModal())
            .then(navigation.navigate('MyProfile')),
        );
      case 'RESET_PASSWORD':
        navigation.replace('ResetPasswordSetPassword');
        break;
      default:
        return null;
    }
    return null;
  };

  const _handleResendOtp = () => {
    switch (verificationType) {
      case 'PAYMENT':
        return user.emailConfirmed
          ? setShowOtpMethodModal(true)
          : dispatch(sendPaymentOtpAction(''));
      case 'REGISTER':
        dispatch(registerResendOtpAction());
        break;
      case 'UPDATE_MOBILE_NUMBER':
        return user.emailConfirmed
          ? setShowOtpMethodModal(true)
          : dispatch(resendUpdateMobileOtpAction());
      case 'RESET_PASSWORD':
        dispatch(resetPasswordResendOtpAction());
        break;
      default:
        return null;
    }
    return null;
  };

  const _closeModal = () => {
    switch (verificationType) {
      case 'UPDATE_MOBILE_NUMBER':
        navigation.navigate('MyProfile');
        setModalVisible(false);
        setShowOtpMethodModal(false);
        break;
      default:
        setModalVisible(false);
        setShowOtpMethodModal(false);
    }
  };

  const _toggleNumeric = (method) => {
    setShowOtpMethodModal(false);
    setOtpMethod(method);
  };

  const triggerIsLoading = (loading) => {
    setIsLoading(loading);
  };

  return showOtpMethodModal ? (
    <OtpMethodModal
      closeModal={_closeModal}
      switchBackToNumericModal={_toggleNumeric}
      verificationType={verificationType}
    />
  ) : (
    <Modal
      avoidKeyboard
      hasBackdrop
      backdropOpacity={0.7}
      backdropColor={colors.primary}
      isVisible={visible}
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
          <Text style={custom.modalCenterTitle}>VERIFICATION CODE</Text>
          <Text style={custom.modalCenterSubtitle}>
            {otpMessage(otpMethod, verificationType, _.isNil(unconfirmedEmail))}
          </Text>
          <NumericalInputForm
            submitForm={_handleFormSubmission}
            initialValues={otpModel()}
            onSuccess={_handleFormSuccess}
            otpOption={otpSetting}
            isLoading={triggerIsLoading}
          />
          <TouchableOpacity onPress={_handleResendOtp}>
            <Text style={custom.resendOtpStyle}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalLoader isLoading={isLoading} />
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

OtpNumericInput.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  afterOtpRoute: PropTypes.string,
  verificationType: PropTypes.string.isRequired,
  userData: PropTypes.object,
};

OtpNumericInput.defaultProps = {
  userData: {},
  afterOtpRoute: '',
};

export default OtpNumericInput;
