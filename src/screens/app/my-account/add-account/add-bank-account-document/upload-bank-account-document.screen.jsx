import React from 'react';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../../components/containers';
import { UploadDocumentForm } from '../../../../../components/forms';
import { bankAccountDocumentModel } from '../../../../../models';
import { uploadBankAccountDocumentAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';

const UploadBankAccountDocumentScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleFormSubmit = (bankAccountId, formData) => {
    return dispatch(uploadBankAccountDocumentAction(bankAccountId, formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop(2);
  };

  const { isLoading } = useSelector((reducer) => reducer.bankAccountReducer);
  useDisableBackButtonWhileLoading(isLoading, 2);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Proof of Bank</Text>
        <Text style={custom.centerSubtitle}>
          This document needs to include your full name, bank account number as well as a bank
          letterhead. It can be an official letter from the bank or an account statement, either
          cannot be older than three months.
        </Text>
        <Text style={custom.centerSubtitle}>Upload a PDF where possible.</Text>
      </PaddedContainer>
      <PaddedContainer>
        <UploadDocumentForm
          submitForm={_handleFormSubmit}
          initialValues={bankAccountDocumentModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

UploadBankAccountDocumentScreen.propTypes = {};

UploadBankAccountDocumentScreen.defaultProps = {};

export default UploadBankAccountDocumentScreen;
