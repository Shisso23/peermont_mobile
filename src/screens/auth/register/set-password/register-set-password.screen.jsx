import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SetPasswordForm } from '../../../../components/forms';
import { setPasswordModel } from '../../../../models';
import { setPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../../components/containers';

const RegisterSetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleFormSubmission = (formData) => {
    return dispatch(setPasswordAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('SignIn');
  };

  return (
    <FormPageContainer>
      <Text>Hello, Set Register new password</Text>
      <SetPasswordForm
        initialValues={setPasswordModel()}
        submitForm={_handleFormSubmission}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

RegisterSetPasswordScreen.propTypes = {};

RegisterSetPasswordScreen.defaultProps = {};

export default RegisterSetPasswordScreen;
