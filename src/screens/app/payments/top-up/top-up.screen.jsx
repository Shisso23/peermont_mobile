import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { TopUpForm } from '../../../../components/forms';
import { PaddedContainer, KeyboardScrollContainer } from '../../../../components/containers';
import { getCreditCardsAction } from '../../../../reducers/credit-card-reducer/credit-card.actions';
import { initiateTopUpAction } from '../../../../reducers/payments-reducer/payments.actions';
import { paymentSelector } from '../../../../reducers/payments-reducer/payments.reducer';
import { topUpModel } from '../../../../models';
import { useDisableBackButtonWhileLoading, useRefreshHeaderButton } from '../../../../hooks';
import { custom } from '../../../../../theme/theme.styles';

const TopUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector(paymentSelector);
  const dailyTopUpLimitLeft = _.get(route, 'params.dailyTopUpLimitLeft');

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
        {!_.isNil(dailyTopUpLimitLeft) && (
          <Text h4 style={custom.centerSubtitle}>
            Remaining daily top up limit is {dailyTopUpLimitLeft}
          </Text>
        )}
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
