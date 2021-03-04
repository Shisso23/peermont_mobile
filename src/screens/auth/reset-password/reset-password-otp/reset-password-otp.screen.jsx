import React from 'react';
import { Text } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyResetPasswordOtpAction,
  resetPasswordResendOtpAction,
} from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { FormPageContainer } from '../../../../components/containers';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const ResetPasswordOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyResetPasswordOtpAction(formData));
  };

  const _handleResendOtp = () => {
    dispatch(resetPasswordResendOtpAction());
  };

  const _handleFormSuccess = () => {
    navigation.replace('ResetPasswordSetPassword');
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <FormPageContainer>
      <Text>Please enter otp</Text>
      <Text>Please enter the OTP that we have sent to your device to reset your password.</Text>
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
