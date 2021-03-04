import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { MembershipCardForm } from '../../../components/forms';
import { registrationMembershipCardModel } from '../../../models';
import { registerAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { FormPageContainer } from '../../../components/containers';
import { useDisableBackButtonWhileLoading } from '../../../hooks';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);

  const _handleFormSubmit = (formData) => {
    return dispatch(registerAction({ formData }));
  };

  const _onFormSuccess = () => {
    navigation.replace('RegisterOtp');
  };

  useDisableBackButtonWhileLoading(isLoading);

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
