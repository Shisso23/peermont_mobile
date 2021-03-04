import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { SetPasswordForm } from '../../../../components/forms';
import { setPasswordModel } from '../../../../models';
import { resetPasswordAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const ResetPasswordSetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(resetPasswordAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Enter your new password</Text>
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

ResetPasswordSetPasswordScreen.propTypes = {};

ResetPasswordSetPasswordScreen.defaultProps = {};

export default ResetPasswordSetPasswordScreen;
