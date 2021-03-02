import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  sendPaymentOtpAction,
  verifyPaymentOtpAction,
} from '../../../../reducers/payments-reducer/payments.actions';
import { NumericalInputForm } from '../../../../components/forms';
import { otpModel } from '../../../../models';

const PaymentOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyPaymentOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    const { afterOtpRoute } = route.params;
    navigation.replace(afterOtpRoute);
  };

  const _handleResendOTP = () => {
    return dispatch(sendPaymentOtpAction(''));
  };

  return (
    <View>
      <Text h4>OTP</Text>
      <Text>Please enter the OTP that we have sent to your device to proceed.</Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={otpModel()}
        onSuccess={_handleFormSuccess}
      />
      <Button title="Resend OTP" onPress={_handleResendOTP} />
    </View>
  );
};

PaymentOtpScreen.propTypes = {};

PaymentOtpScreen.defaultProps = {};

export default PaymentOtpScreen;
