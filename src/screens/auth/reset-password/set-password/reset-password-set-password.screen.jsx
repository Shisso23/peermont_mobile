import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SetPasswordForm } from '../../../../components/forms';
import { setPasswordModel } from '../../../../models';
import { resetPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../../components/containers';

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
    <FormPageContainer>
      <Text>Hello, Set new password</Text>
      <SetPasswordForm
        initialValues={setPasswordModel()}
        submitForm={_handleFormSubmission}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

const styles = StyleSheet.create({});

ResetPasswordSetPasswordScreen.propTypes = {};

ResetPasswordSetPasswordScreen.defaultProps = {};

export default ResetPasswordSetPasswordScreen;
