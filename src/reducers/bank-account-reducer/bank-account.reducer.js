import _ from 'lodash';
import CreateAction from '../action-utilities/action-creator';

const reducerName = 'bankAccount';

const setBankAccounts = CreateAction(reducerName, 'SET_BANK_ACCOUNTS');
export const setBankAccountsAction = setBankAccounts.action;

const removeBankAccount = CreateAction(reducerName, 'REMOVE_BANK_ACCOUNT');
export const removeBankAccountAction = removeBankAccount.action;

const appendBankAccount = CreateAction(reducerName, 'APPEND_BANK_ACCOUNT');
export const appendBankAccountAction = appendBankAccount.action;

const initialState = {
  bankAccounts: [],
};

export default function bankAccountReducer(state = initialState, action) {
  switch (action.type) {
    case setBankAccounts.actionType:
      return {
        ...state,
        bankAccounts: action.payload,
      };
    case removeBankAccount.actionType:
      return {
        ...state,
        bankAccounts: _.remove(state.bankAccounts, { id: action.payload }),
      };
    case appendBankAccount.actionType:
      return {
        ...state,
        bankAccounts: _.concat(state.bankAccounts, [action.payload]),
      };
    default:
      return state;
  }
}
