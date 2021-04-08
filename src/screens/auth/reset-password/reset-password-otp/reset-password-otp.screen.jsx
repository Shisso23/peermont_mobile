import React from 'react';
import { Button, Text, Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyResetPasswordOtpAction,
  resetPasswordResendOtpAction,
} from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
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
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          To proceed, Enter your One Time Pin to reset your password. We have sent a SMS with a One
          Time Pin(OTP) to your mobile number for validation.
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

export default ResetPasswordOtpScreen;
