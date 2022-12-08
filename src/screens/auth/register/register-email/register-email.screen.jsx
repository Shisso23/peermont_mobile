import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';

import { RegisterEmailForm } from '../../../../components/forms';
import { registrationEmailModel } from '../../../../models';
import { registerEmailAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const RegisterEmailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmit = (formData) => {
    return dispatch(registerEmailAction(formData));
  };

  const _onFormSuccess = () => {
    navigation.replace('RegisterEmailComplete');
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Email Registration</Text>
        <Text style={custom.centerSubtitle}>Enter your email address</Text>
      </PaddedContainer>
      <PaddedContainer>
        <RegisterEmailForm
          submitForm={_handleFormSubmit}
          onSuccess={_onFormSuccess}
          initialValues={registrationEmailModel()}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

RegisterEmailScreen.propTypes = {};
RegisterEmailScreen.defaultProps = {};

export default RegisterEmailScreen;
