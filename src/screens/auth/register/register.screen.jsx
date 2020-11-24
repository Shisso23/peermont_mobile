import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MembershipCardForm } from '../../../components/forms';
import { registrationMembershipCardModel } from '../../../models';
import { registerAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../components/containers';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleFormSubmit = (formData) => {
    return dispatch(registerAction({ formData }));
  };

  const _onFormSuccess = () => {
    navigation.replace('RegisterOtp');
  };

  return (
    <FormPageContainer>
      <MembershipCardForm
        submitForm={_handleFormSubmit}
        onSuccess={_onFormSuccess}
        initialValues={registrationMembershipCardModel()}
      />
    </FormPageContainer>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
