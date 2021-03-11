import _ from 'lodash';
import {
  setBankAccountsAction,
  removeBankAccountAction,
  appendBankAccountAction,
  setIsLoadingAction,
} from './bank-account.reducer';
import { bankAccountService } from '../../services';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return bankAccountService
      .getBankAccounts()
      .then((_bankAccounts) => {
        dispatch(setBankAccountsAction(_bankAccounts));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const createBankAccountAction = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return bankAccountService
      .createBankAccount(formData)
      .then((newBankAccount) => {
        dispatch(appendBankAccountAction(newBankAccount));
        return _.get(newBankAccount, 'id');
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const uploadBankAccountDocumentAction = (bankAccountId, formData) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return bankAccountService
      .uploadBankAccountDocument(bankAccountId, formData)
      .then(() => {
        dispatch(getBankAccountsAction());
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const updateBankAccountAction = (bankAccountForm) => {
  const _shouldReUploadProofOfBanking = !_.isEmpty(bankAccountForm.proofOfBankDocument);
  return () => {
    return bankAccountService.updateBankAccount(bankAccountForm).then((bankAccountId) => {
      if (_shouldReUploadProofOfBanking) {
        return bankAccountService.uploadProofOfBankDocument(
          bankAccountId,
          bankAccountForm.proofOfBankDocument,
        );
      }
      return Promise.resolve();
    });
  };
};

export const deleteBankAccountAction = (id) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return bankAccountService
      .deleteBankAccount(id)
      .then(() => {
        dispatch(removeBankAccountAction(id));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
