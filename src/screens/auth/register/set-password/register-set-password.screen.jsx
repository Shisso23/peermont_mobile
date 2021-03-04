import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { SetPasswordForm } from '../../../../components/forms';
import { setPasswordModel } from '../../../../models';
import { setPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../../components/containers';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const RegisterSetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(setPasswordAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  useDisableBackButtonWhileLoading(isLoading);

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
