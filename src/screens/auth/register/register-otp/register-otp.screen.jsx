import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyRegisterOtpAction,
  registerResendOtpAction,
} from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { FormPageContainer } from '../../../../components/containers';

const RegisterOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(verifyRegisterOtpAction(formData));
  };
  const _handleFormSuccess = () => {
    navigation.replace('RegisterSetPassword');
  };

  const _handleResendOtp = () => {
    dispatch(registerResendOtpAction());
  };

  return (
    <FormPageContainer>
      <Text>Please enter otp</Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={otpModel()}
        onSuccess={_handleFormSuccess}
      />
      <Button title="Resend OTP" onPress={_handleResendOtp} />
    </FormPageContainer>
  );
};

export default RegisterOtpScreen;
