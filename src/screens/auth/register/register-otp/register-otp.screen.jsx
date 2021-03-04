import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Divider } from 'react-native-elements';
import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyRegisterOtpAction,
  registerResendOtpAction,
} from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const RegisterOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyRegisterOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('RegisterSetPassword');
  };

  const _handleResendOtp = () => {
    dispatch(registerResendOtpAction());
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          Enter your One Time Pin to register. We have sent a SMS with a One Time Pin(OTP) to your
          mobile number for validation.
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

export default RegisterOtpScreen;
