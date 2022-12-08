import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { verifyPaymentOtpAction } from '../../../../reducers/payments-reducer/payments.actions';
import { paymentSelector } from '../../../../reducers/payments-reducer/payments.reducer';
import { NumericalInputForm } from '../../../../components/forms';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { ModalLoader } from '../../../../components';
import { OtpMethodModal } from '../../../../components/atoms';

const PaymentOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector(paymentSelector);
  const [showOtpMethodsModal, setShowOtpMethodsModal] = useState(false);

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyPaymentOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    const { afterOtpRoute } = route.params;
    navigation.replace(afterOtpRoute);
  };

  const _handleResendOtp = () => {
    setShowOtpMethodsModal(true);
  };

  const _closeModal = (value) => {
    setShowOtpMethodsModal(value);
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          To proceed, Enter your One Time Pin to confirm payment. We have sent a SMS with a One Time
          Pin (OTP) to your mobile number for validation.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <NumericalInputForm
          submitForm={_handleFormSubmission}
          initialValues={otpModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
      <Divider />
      <PaddedContainer>
        <TouchableOpacity onPress={_handleResendOtp}>
          <Text style={custom.resendOtpStyle}>Resend OTP</Text>
        </TouchableOpacity>
      </PaddedContainer>
      <OtpMethodModal visible={showOtpMethodsModal} setModalVisible={_closeModal} />
      <ModalLoader isLoading={isLoading} />
    </KeyboardScrollContainer>
  );
};

PaymentOtpScreen.propTypes = {};

PaymentOtpScreen.defaultProps = {};

export default PaymentOtpScreen;
