import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { MobileNumberForm } from '../../../components/forms';
import { requestResetPasswordOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../components/containers';
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
    <FormPageContainer>
      <MobileNumberForm
        submitForm={_handleFormSubmission}
        initialValues={signInFormData}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

ResetPasswordScreen.propTypes = {};
ResetPasswordScreen.defaultProps = {};

export default ResetPasswordScreen;
