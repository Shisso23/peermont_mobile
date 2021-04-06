import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { PayOutForm } from '../../../../components/forms';
import { payOutModel } from '../../../../models';
import { performPayoutAction } from '../../../../reducers/payments-reducer/payments.actions';
import { PaddedContainer, KeyboardScrollContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading, useRefreshHeaderButton } from '../../../../hooks';
import { getBankAccountsAction } from '../../../../reducers/bank-account-reducer/bank-account.actions';

const PayOutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const [initialBankAccountId, setInitialBankAccountId] = useState();

  const { isLoading } = useSelector((reducer) => reducer.paymentReducer);

  const initialBankAccountValues = payOutModel({ bankAccountId: initialBankAccountId });

  const _handleSubmission = (formData) => {
    return dispatch(performPayoutAction(formData));
  };

  const _handleSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'PayOutComplete',
    });
  };

  useDisableBackButtonWhileLoading(isLoading);

  const _getBankAccountsAndAutoSelectFirst = () => {
    dispatch(getBankAccountsAction()).then((resp) => {
      const bankAccount = _.nth(resp, 0);
      const status = _.get(bankAccount, 'status');

      if (status === 'verified') {
        const id = _.get(bankAccount, 'id');
        setInitialBankAccountId(id);
      }
    });
  };

  useRefreshHeaderButton(() => {
    _getBankAccountsAndAutoSelectFirst();
  }, isLoading);

  useEffect(() => {
    _getBankAccountsAndAutoSelectFirst();
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
