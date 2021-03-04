import React from 'react';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../../components/containers';
import { BankAccountForm } from '../../../../../components/forms';
import { bankAccountModel } from '../../../../../models';
import { createBankAccountAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';

const AddBankAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _handleFormSubmit = (formData) => {
    return dispatch(createBankAccountAction(formData));
  };

  const _handleFormSuccess = (bankAccountId) => {
    navigation.push('UploadBankAccountDocument', {
      bankAccountId,
    });
  };

  const { isLoading } = useSelector((reducer) => reducer.bankAccountReducer);
  useDisableBackButtonWhileLoading(isLoading);

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
    </KeyboardScrollContainer>
  );
};

AddBankAccountScreen.propTypes = {};

AddBankAccountScreen.defaultProps = {};

export default AddBankAccountScreen;
