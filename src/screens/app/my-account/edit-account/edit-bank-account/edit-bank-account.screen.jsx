import React from 'react';
import _ from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { FormPageContainer } from '../../../../../components/containers';
import { BankAccountForm } from '../../../../../components/forms';
import { updateBankAccountAction } from '../../../../../reducers/bank-account-reducer/bank-account.actions';
import { bankAccountModel } from '../../../../../models';

const EditBankAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const _handleFormSubmit = (formData) => {
    return dispatch(updateBankAccountAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  const { bankAccount } = route.params;
  const initialValues = _.merge(bankAccountModel(), bankAccount);
  const proofOfBankingFailed = { proofOfBankDocument: 'Please re-upload your proof of bank' };
  const initialErrors = bankAccount.proofOfBankingStatus === 'failed' ? proofOfBankingFailed : {};

  return (
    <FormPageContainer>
      <BankAccountForm
        submitForm={_handleFormSubmit}
        initialErrors={initialErrors}
        initialValues={initialValues}
        onSuccess={_handleFormSuccess}
        edit
      />
    </FormPageContainer>
  );
};

EditBankAccountScreen.propTypes = {};

EditBankAccountScreen.defaultProps = {};

export default EditBankAccountScreen;
