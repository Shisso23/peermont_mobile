import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { CreditCardForm } from '../../../../../components/forms';
import { creditCardModel } from '../../../../../models';
import { FormPageContainer } from '../../../../../components/containers';
import { createCreditCardAction } from '../../../../../reducers/credit-card-reducer/credit-card.actions';

const AddCreditCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleSubmission = (formData) => {
    return dispatch(createCreditCardAction(formData));
  };
  const _handleFormSuccess = () => {
    navigation.pop();
  };

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
