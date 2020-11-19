import { setBankAccountsAction } from './bank-account.reducer';
import { bankAccountService } from '../../services';

export const getBankAccountsAction = () => {
  return (dispatch) => {
    return bankAccountService.getBankAccounts().then((_bankAccounts) => {
      dispatch(setBankAccountsAction(_bankAccounts));
    });
  };
};
