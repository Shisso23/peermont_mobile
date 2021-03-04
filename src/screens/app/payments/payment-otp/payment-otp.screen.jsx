import React from 'react';
import { Button, Text, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  sendPaymentOtpAction,
  verifyPaymentOtpAction,
} from '../../../../reducers/payments-reducer/payments.actions';
import { NumericalInputForm } from '../../../../components/forms';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const PaymentOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector((reducer) => reducer.paymentReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyPaymentOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    const { afterOtpRoute } = route.params;
    navigation.replace(afterOtpRoute);
  };

  const _handleResendOtp = () => {
    return dispatch(sendPaymentOtpAction(''));
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          We have sent a SMS with a One Time Pin(OTP) to your mobile number for validation.
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
        <Button title="Resend OTP" onPress={_handleResendOtp} />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

PaymentOtpScreen.propTypes = {};

PaymentOtpScreen.defaultProps = {};

export default PaymentOtpScreen;
