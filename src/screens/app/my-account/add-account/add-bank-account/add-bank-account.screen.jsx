import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { FormPageContainer } from '../../../../../components/containers';
import { BankAccountForm } from '../../../../../components/forms';
import { bankAccountModel } from '../../../../../models';
import { createBankAccountAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';

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

  return (
    <FormPageContainer>
      <BankAccountForm
        submitForm={_handleFormSubmit}
        initialValues={bankAccountModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

AddBankAccountScreen.propTypes = {};

AddBankAccountScreen.defaultProps = {};

export default AddBankAccountScreen;
