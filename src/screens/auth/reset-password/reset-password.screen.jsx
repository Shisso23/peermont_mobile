import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { MobileNumberForm } from '../../../components/forms';
import { requestResetPasswordOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { custom } from '../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../hooks';

const ResetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { signInFormData, isLoading } = useSelector((reducers) => reducers.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(requestResetPasswordOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('ResetPasswordOtp');
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Reset Password</Text>
        <Text style={custom.centerSubtitle}>
          Enter your mobile number to reset your password. You will receive a SMS with a One Time
          Pin(OTP) on your mobile number for validation.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <MobileNumberForm
          submitForm={_handleFormSubmission}
          initialValues={signInFormData}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

ResetPasswordScreen.propTypes = {};
ResetPasswordScreen.defaultProps = {};

export default ResetPasswordScreen;
