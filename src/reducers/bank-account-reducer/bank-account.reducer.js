import CreateAction from '../action-utilities/action-creator';
// import { bankAccountModel } from '../../models';

const reducerName = 'bankAccount';

const setBankAccounts = CreateAction(reducerName, 'SET_BANK_ACCOUNTS');
export const setBankAccountsAction = setBankAccounts.action;
export const setBankAccountsActionType = setBankAccounts.actionType;

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

    default:
      return state;
  }
}
