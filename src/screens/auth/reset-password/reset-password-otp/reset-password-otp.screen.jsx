import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider } from 'react-native-elements';
import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyResetPasswordOtpAction,
  resetPasswordResendOtpAction,
} from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { FormPageContainer } from '../../../../components/containers';

const ResetPasswordOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(verifyResetPasswordOtpAction(formData));
  };

  const _handleResendOtp = () => {
    dispatch(resetPasswordResendOtpAction());
  };

  const _handleFormSuccess = () => {
    navigation.replace('ResetPasswordSetPassword');
  };
  return (
    <FormPageContainer>
      <Text>Please enter otp</Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={otpModel()}
        onSuccess={_handleFormSuccess}
      />
      <Divider />
      <Button title="Resend OTP" onPress={_handleResendOtp} />
    </FormPageContainer>
  );
};

export default ResetPasswordOtpScreen;
