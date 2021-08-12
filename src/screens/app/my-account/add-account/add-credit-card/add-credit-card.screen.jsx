import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { CreditCardForm } from '../../../../../components/forms';
import { creditCardModel } from '../../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../../components/containers';
import {
  createCreditCardAction,
  getCreditCardsAction,
} from '../../../../../reducers/credit-card-reducer/credit-card.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';

const AddCreditCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleSubmission = (formData) => {
    return dispatch(createCreditCardAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
    dispatch(getCreditCardsAction());
  };

  const { isLoading } = useSelector((reducer) => reducer.creditCardReducer);
  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Add Credit Card</Text>
        <Text style={custom.centerSubtitle}>Enter your credit card details.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <CreditCardForm
          submitForm={_handleSubmission}
          initialValues={creditCardModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

AddCreditCardScreen.propTypes = {};

AddCreditCardScreen.defaultProps = {};

export default AddCreditCardScreen;
