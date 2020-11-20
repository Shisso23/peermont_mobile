import { setLoadingAction } from '../user-reducer/user.reducer';
import { setBankAccountsAction, removeBankAccountAction } from './bank-account.reducer';
import { bankAccountService } from '../../services';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return bankAccountService.getBankAccounts().then((_bankAccounts) => {
      dispatch(setBankAccountsAction(_bankAccounts));
      dispatch(setLoadingAction(false));
    });
  };
};

export const deleteBankAccountAction = (id) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return bankAccountService.deleteBankAccount(id).then(() => {
      dispatch(removeBankAccountAction());
      dispatch(setLoadingAction(false));
    });
  };
};
