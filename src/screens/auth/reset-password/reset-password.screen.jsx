import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MobileNumberForm } from '../../../components/forms';
import { resetPasswordModel } from '../../../models';
import { requestResetPasswordOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../components/containers';

const ResetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(requestResetPasswordOtpAction(formData));
  };
  const _handleFormSuccess = () => {
    navigation.replace('ResetPasswordOtp');
  };
  return (
    <FormPageContainer>
      <MobileNumberForm
        submitForm={_handleFormSubmission}
        initialValues={resetPasswordModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

ResetPasswordScreen.propTypes = {};
ResetPasswordScreen.defaultProps = {};

export default ResetPasswordScreen;
