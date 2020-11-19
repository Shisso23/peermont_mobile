import { setBankAccountsAction, removeBankAccountAction } from './bank-account.reducer';
import { bankAccountService } from '../../services';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    return bankAccountService.getBankAccounts().then((_bankAccounts) => {
      dispatch(setBankAccountsAction(_bankAccounts));
    });
  };
};

export const deleteBankAccountAction = (id) => {
  return (dispatch) => {
    return bankAccountService.deleteBankAccount(id).then(() => {
      dispatch(removeBankAccountAction());
    });
  };
};
