import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { TopUpForm } from '../../../../components/forms';
import { PaddedContainer, KeyboardScrollContainer } from '../../../../components/containers';
import { initiateTopUpAction } from '../../../../reducers/payments-reducer/payments.actions';
import { topUpModel } from '../../../../models';
import { useDisableBackButtonWhileLoading, useRefreshHeaderButton } from '../../../../hooks';
import { getCreditCardsAction } from '../../../../reducers/credit-card-reducer/credit-card.actions';
import { custom } from '../../../../../theme/theme.styles';

const TopUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector((reducer) => reducer.paymentReducer);

  const _handleFormSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'TopUpComplete',
    });
  };

  const _handleFormSubmit = (formData) => {
    return dispatch(initiateTopUpAction(formData));
  };

  useDisableBackButtonWhileLoading(isLoading);

  useRefreshHeaderButton(() => {
    dispatch(getCreditCardsAction());
  }, isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Top Up</Text>
        <Text style={custom.centerSubtitle}>Enter an amount and select a payment method.</Text>
        <Text h4 style={custom.centerSubtitle}>
          Your balance is {_.get(route, 'params.balance')}
        </Text>
      </PaddedContainer>

      <TopUpForm
        initialValues={topUpModel()}
        onSuccess={_handleFormSuccess}
        submitForm={_handleFormSubmit}
      />
    </KeyboardScrollContainer>
  );
};

TopUpScreen.propTypes = {};

TopUpScreen.defaultProps = {};

export default TopUpScreen;
