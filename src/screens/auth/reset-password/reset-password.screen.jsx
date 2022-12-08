import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@rneui/themed';

import { OtpNumericInput } from '../../../components/molecules';
import { MobileNumberForm } from '../../../components/forms';
import { requestResetPasswordOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { custom } from '../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../hooks';

const ResetPasswordScreen = () => {
  const dispatch = useDispatch();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const { signInFormData, isLoading } = useSelector((reducers) => reducers.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(requestResetPasswordOtpAction(formData));
  };

  const _handleFormSuccess = () => {
    setShowOtpModal(true);
  };

  const _closeModal = (close) => {
    setShowOtpModal(close);
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
        <Text style={custom.centerSubtitle}>If your account exists you will get an OTP.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <MobileNumberForm
          submitForm={_handleFormSubmission}
          initialValues={signInFormData}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeModal}
        verificationType="RESET_PASSWORD"
      />
    </KeyboardScrollContainer>
  );
};

ResetPasswordScreen.propTypes = {};
ResetPasswordScreen.defaultProps = {};

export default ResetPasswordScreen;
