import React from 'react';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { SetPasswordForm } from '../../../../components/forms';
import { setPasswordModel } from '../../../../models';
import { setPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const RegisterSetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(setPasswordAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('RegisterEmail');
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>New password</Text>
        <Text style={custom.centerSubtitle}>Enter your new password.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <SetPasswordForm
          initialValues={setPasswordModel()}
          submitForm={_handleFormSubmission}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

RegisterSetPasswordScreen.propTypes = {};

RegisterSetPasswordScreen.defaultProps = {};

export default RegisterSetPasswordScreen;
