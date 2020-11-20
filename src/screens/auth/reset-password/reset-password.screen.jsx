import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordForm } from '../../../components/forms';
import { resetPasswordModel } from '../../../models';
import { requestResetPasswordOtpAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

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
    <View>
      <ForgotPasswordForm
        submitForm={_handleFormSubmission}
        initialValues={resetPasswordModel({ login: '0824776117' })}
        onSuccess={_handleFormSuccess}
      />
    </View>
  );
};

ResetPasswordScreen.propTypes = {};
ResetPasswordScreen.defaultProps = {};

export default ResetPasswordScreen;
