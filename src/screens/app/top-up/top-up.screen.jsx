import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TopUpForm } from '../../../components/forms';
import { FormPageContainer } from '../../../components/containers';
import { initiateTopUpAction } from '../../../reducers/payments-reducer/payments.actions';
import { topUpModel } from '../../../models';

const TopUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleFormSuccess = () => {
    navigation.replace('PaymentOtp');
  };

  const _handleFormSubmit = (formData) => {
    return dispatch(initiateTopUpAction(formData));
  };

  return (
    <FormPageContainer>
      <TopUpForm
        initialValues={topUpModel()}
        onSuccess={_handleFormSuccess}
        submitForm={_handleFormSubmit}
      />
    </FormPageContainer>
  );
};

TopUpScreen.propTypes = {};

TopUpScreen.defaultProps = {};

export default TopUpScreen;
