import React from 'react';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { FormPageContainer } from '../../../../../components/containers';
import { UploadDocumentForm } from '../../../../../components/forms';
import { bankAccountDocumentModel } from '../../../../../models';
import { uploadBankAccountDocumentAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';

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
    <FormPageContainer>
      <Text h4>Proof of Bank</Text>
      <Text>
        This document needs to include your full name, bank account number as well as a bank
        letterhead. It can be an official letter from the bank or an account statement, either
        cannot be older than three months.
      </Text>
      <Text>Upload a PDF where possible.</Text>
      <UploadDocumentForm
        submitForm={_handleFormSubmit}
        initialValues={bankAccountDocumentModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

UploadBankAccountDocumentScreen.propTypes = {};

UploadBankAccountDocumentScreen.defaultProps = {};

export default UploadBankAccountDocumentScreen;
