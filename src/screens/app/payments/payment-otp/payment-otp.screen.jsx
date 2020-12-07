import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NumericalInputForm } from '../../../../components/forms';
import { otpModel } from '../../../../models';
import { verifyPaymentOtpAction } from '../../../../reducers/payments-reducer/payments.actions';

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

  return (
    <View>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={otpModel()}
        onSuccess={_handleFormSuccess}
      />
    </View>
  );
};

PaymentOtpScreen.propTypes = {};

PaymentOtpScreen.defaultProps = {};

export default PaymentOtpScreen;
