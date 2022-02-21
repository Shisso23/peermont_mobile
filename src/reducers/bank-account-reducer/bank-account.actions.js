import _ from 'lodash';
import {
  setBankAccountsAction,
  removeBankAccountAction,
  setIsLoadingAction,
  setTemporaryTokenAction,
} from './bank-account.reducer';
import { bankAccountService } from '../../services';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return bankAccountService
      .getBankAccounts()
      .then((_bankAccounts) => {
        dispatch(setBankAccountsAction(_bankAccounts));
        return _bankAccounts;
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const createBankAccountAction = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return bankAccountService
      .createBankAccount(formData)
      .then((token) => {
        dispatch(setTemporaryTokenAction(_.get(token, 'token')));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const BankAccountResendOtpAction = () => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));
    const { token } = getState().bankAccountReducer;

    return bankAccountService
      .resendBankAccountOtp(token)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const verifyBankAccountOtpAction = (formData) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));
    const { token } = getState().bankAccountReducer;

    return bankAccountService
      .verifyBankAccountOtp(formData, token)
      .then((newBankAccount) => {
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
