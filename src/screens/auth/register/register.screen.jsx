import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MembershipCardForm } from '../../../components/forms';
import { membershipCardModel } from '../../../models';
import { registerAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const _handleFormSubmit = (formData) => {
    return dispatch(registerAction({ formData }));
  };

  const _onFormSuccess = () => {};
  return (
    <View>
      <MembershipCardForm
        submitForm={_handleFormSubmit}
        onSuccess={_onFormSuccess}
        initialValues={membershipCardModel({ card_number: '210200002655713767', pin: '1234' })}
        // initialValues={membershipCardModel({})}
      />
    </View>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
