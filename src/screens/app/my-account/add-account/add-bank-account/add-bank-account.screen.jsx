import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';

import { OtpNumericInput } from '../../../../../components/molecules';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../../components/containers';
import { BankAccountForm } from '../../../../../components/forms';
import { bankAccountModel } from '../../../../../models';
import { createBankAccountAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';

const AddBankAccountScreen = () => {
  const dispatch = useDispatch();
  const [showOtpModal, setShowOtpModal] = useState(false);

  const _handleFormSubmit = (formData) => {
    return dispatch(createBankAccountAction(formData));
  };

  const _handleFormSuccess = () => {
    setShowOtpModal(true);
  };

  const { isLoading } = useSelector((reducer) => reducer.bankAccountReducer);
  useDisableBackButtonWhileLoading(isLoading);

  const _closeModal = (close) => {
    setShowOtpModal(close);
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Add Bank Account</Text>
        <Text style={custom.centerSubtitle}>
          Enter your bank account details. Approval may take 48 hours to process, not including
          weekends and public holidays.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <BankAccountForm
          submitForm={_handleFormSubmit}
          initialValues={bankAccountModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeModal}
        verificationType="BANK_ACCOUNT"
      />
    </KeyboardScrollContainer>
  );
};

AddBankAccountScreen.propTypes = {};

AddBankAccountScreen.defaultProps = {};

export default AddBankAccountScreen;
