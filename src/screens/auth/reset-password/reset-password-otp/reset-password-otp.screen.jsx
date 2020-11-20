import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NumericalInputForm } from '../../../../components/forms';
import { verifyResetPasswordOtpAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { resetPasswordOtpModel } from '../../../../models';

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
    <View>
      <Text>Please enter otp</Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={resetPasswordOtpModel()}
        onSuccess={_handleFormSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResetPasswordOtpScreen;
