import React, { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { OtpNumericInput } from '../../../../components/molecules';
import { PayOutForm } from '../../../../components/forms';
import { payOutModel } from '../../../../models';
import {
  performPayoutAction,
  hasQueuedPayouts,
} from '../../../../reducers/payments-reducer/payments.actions';
import { PaddedContainer, KeyboardScrollContainer } from '../../../../components/containers';
import { useDisableBackButtonWhileLoading, useRefreshHeaderButton } from '../../../../hooks';
import { getBankAccountsAction } from '../../../../reducers/bank-account-reducer/bank-account.actions';
import { paymentSelector } from '../../../../reducers/payments-reducer/payments.reducer';
import { membershipCardSelector } from '../../../../reducers/membership-card-reducer/membership-card.reducer';
import { custom } from '../../../../../theme/theme.styles';

const PayOutScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { isLoading } = useSelector(paymentSelector);
  const { currentMembershipCard } = useSelector(membershipCardSelector);
  const initialBankAccountValues = payOutModel();
  const [showOtpModal, setShowOtpModal] = useState(false);

  const _handleSubmission = (formData) => {
    return dispatch(performPayoutAction(formData));
  };

  const _handleSuccess = () => {
    setShowOtpModal(true);
  };

  useDisableBackButtonWhileLoading(isLoading);

  const _getBankAccounts = () => {
    dispatch(getBankAccountsAction());
  };

  useRefreshHeaderButton(() => {
    _getBankAccounts();
  }, isLoading);

  const _closeModal = (close) => {
    setShowOtpModal(close);
  };

  useEffect(() => {
    _getBankAccounts();
    dispatch(hasQueuedPayouts({ membership_card_id: currentMembershipCard.id }));
  }, []);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Pay Out</Text>
        <Text style={custom.centerSubtitle}>Enter an amount and select a bank account.</Text>
        <Text h4 style={custom.centerSubtitle}>
          Your balance is {_.get(route, 'params.balance')}
        </Text>
      </PaddedContainer>
      <PayOutForm
        initialValues={initialBankAccountValues}
        submitForm={_handleSubmission}
        onSuccess={_handleSuccess}
      />
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeModal}
        afterOtpRoute="PayOutComplete"
        verificationType="PAYMENT"
      />
    </KeyboardScrollContainer>
  );
};

PayOutScreen.propTypes = {};

PayOutScreen.defaultProps = {};

export default PayOutScreen;
