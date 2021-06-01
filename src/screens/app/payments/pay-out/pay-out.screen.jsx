import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { PayOutForm } from '../../../../components/forms';
import { payOutModel } from '../../../../models';
import { performPayoutAction } from '../../../../reducers/payments-reducer/payments.actions';
import { PaddedContainer, KeyboardScrollContainer } from '../../../../components/containers';
import { useDisableBackButtonWhileLoading, useRefreshHeaderButton } from '../../../../hooks';
import { getBankAccountsAction } from '../../../../reducers/bank-account-reducer/bank-account.actions';
import { paymentSelector } from '../../../../reducers/payments-reducer/payments.reducer';
import { custom } from '../../../../../theme/theme.styles';

const PayOutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector(paymentSelector);
  const initialBankAccountValues = payOutModel();

  const _handleSubmission = (formData) => {
    return dispatch(performPayoutAction(formData));
  };

  const _handleSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'PayOutComplete',
    });
  };

  useDisableBackButtonWhileLoading(isLoading);

  const _getBankAccounts = () => {
    dispatch(getBankAccountsAction());
  };

  useRefreshHeaderButton(() => {
    _getBankAccounts();
  }, isLoading);

  useEffect(() => {
    _getBankAccounts();
    Alert.alert(
      'Payouts',
      'Payouts may take up to 48 hours to process, not including weekends and public holidays.',
    );
  }, []);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Pay Out</Text>
        <Text style={custom.centerSubtitle}>
          Enter an amount and select a bank account. Payouts may take 48 hours to process, not
          including weekends and public holidays.
        </Text>
        <Text h4 style={custom.centerSubtitle}>
          Your balance is {_.get(route, 'params.balance')}
        </Text>
      </PaddedContainer>
      <PayOutForm
        initialValues={initialBankAccountValues}
        submitForm={_handleSubmission}
        onSuccess={_handleSuccess}
      />
    </KeyboardScrollContainer>
  );
};

PayOutScreen.propTypes = {};

PayOutScreen.defaultProps = {};

export default PayOutScreen;
