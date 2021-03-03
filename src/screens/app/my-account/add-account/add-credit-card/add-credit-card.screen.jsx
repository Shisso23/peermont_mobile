import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { CreditCardForm } from '../../../../../components/forms';
import { creditCardModel } from '../../../../../models';
import { FormPageContainer } from '../../../../../components/containers';
import { createCreditCardAction } from '../../../../../reducers/credit-card-reducer/credit-card.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks/disable-back-button-while-loading/use-disable-back-button-while-loading';

const AddCreditCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleSubmission = (formData) => {
    return dispatch(createCreditCardAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  const { isLoading } = useSelector((reducer) => reducer.creditCardReducer);
  useDisableBackButtonWhileLoading(isLoading);

  return (
    <FormPageContainer>
      <Text h4>Add Credit Card</Text>
      <Text>Please provide your card details</Text>
      <CreditCardForm
        submitForm={_handleSubmission}
        initialValues={creditCardModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

AddCreditCardScreen.propTypes = {};

AddCreditCardScreen.defaultProps = {};

export default AddCreditCardScreen;
