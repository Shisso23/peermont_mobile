import CreateAction from '../action-utilities/action-creator';
import { constructBankModels } from '../../models/app/bank/bank.model';

const reducerName = 'form-data';

const setBanks = CreateAction(reducerName, 'SET_BANKS');
export const setBanksAction = setBanks.action;

const initialState = {
  banks: constructBankModels([]),
};

export const formDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case setBanks.actionType:
      return {
        ...state,
        banks: action.payload,
      };

    default:
      return state;
  }
}

export default {
  formDataReducer,
}
