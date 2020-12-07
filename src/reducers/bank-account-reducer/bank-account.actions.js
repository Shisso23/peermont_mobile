import {
  setBankAccountsAction,
  removeBankAccountAction,
  appendBankAccountAction,
  setIsLoadingAction,
} from './bank-account.reducer';
import { bankAccountService } from '../../services';
import { setLoadingAction } from '../user-reducer/user.reducer';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return bankAccountService.getBankAccounts().then((_bankAccounts) => {
      dispatch(setBankAccountsAction(_bankAccounts));
      dispatch(setIsLoadingAction(false));
    });
  };
};

export const creatBankAccountAction = (formData) => {
  return (dispatch) => {
    return bankAccountService.createBankAccount(formData).then((newBankAccount) => {
      dispatch(appendBankAccountAction(newBankAccount));
    });
  };
};

export const deleteBankAccountAction = (id) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return bankAccountService.deleteBankAccount(id).then(() => {
      dispatch(removeBankAccountAction(id));
      dispatch(setLoadingAction(false));
    });
  };
};
