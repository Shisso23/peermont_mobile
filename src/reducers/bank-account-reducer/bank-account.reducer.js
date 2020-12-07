import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'bankAccount';

const setBankAccounts = CreateAction(reducerName, 'SET_BANK_ACCOUNTS');
export const setBankAccountsAction = setBankAccounts.action;

const removeBankAccount = CreateAction(reducerName, 'REMOVE_BANK_ACCOUNT');
export const removeBankAccountAction = removeBankAccount.action;

const appendBankAccount = CreateAction(reducerName, 'APPEND_BANK_ACCOUNT');
export const appendBankAccountAction = appendBankAccount.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  bankAccounts: [],
  isLoading: false,
};

export default function bankAccountReducer(state = initialState, action) {
  switch (action.type) {
    case setBankAccounts.actionType:
      return {
        ...state,
        bankAccounts: action.payload,
      };
    case removeBankAccount.actionType:
      _.remove(state.bankAccounts, { id: action.payload });
      return {
        ...state,
      };
    case appendBankAccount.actionType:
      return {
        ...state,
        bankAccounts: _.concat(state.bankAccounts, [action.payload]),
      };
    case setIsLoading.actionType:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
