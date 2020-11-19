import { formDataService } from '../../services';
import { setBanksAction } from './form-data.reducer';

const getBanksAction = () => {
  return (dispatch) => {
    return formDataService.getBankAccounts().then((bankAccounts) => {
      return dispatch(setBanksAction(bankAccounts));
    });
  };
};

export const loadAllFormDataAction = () => {
  return (dispatch) => {
    return Promise.all([dispatch(getBanksAction())]);
  };
};
