import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NumericalInputForm } from '../../../../components/forms';
import { verifyResetPasswordOtpAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { FormPageContainer } from '../../../../components/containers';

const ResetPasswordOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(verifyResetPasswordOtpAction(formData));
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
    </FormPageContainer>
  );
};

const styles = StyleSheet.create({});

export default ResetPasswordOtpScreen;
