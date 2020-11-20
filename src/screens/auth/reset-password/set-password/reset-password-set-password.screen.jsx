import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SetPasswordForm } from '../../../../components/forms';
import { resetPasswordSetPasswordModel } from '../../../../models';
import { resetPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';

const ResetPasswordSetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(resetPasswordAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('SignIn');
  };

  return (
    <View>
      <Text>Hello, Set new password</Text>
      <SetPasswordForm
        initialValues={resetPasswordSetPasswordModel()}
        submitForm={_handleFormSubmission}
        onSuccess={_handleFormSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

ResetPasswordSetPasswordScreen.propTypes = {};

ResetPasswordSetPasswordScreen.defaultProps = {};

export default ResetPasswordSetPasswordScreen;
