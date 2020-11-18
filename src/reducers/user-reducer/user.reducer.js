import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';

const reducerName = 'user';

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;
export const setUserActionType = setUser.actionType;

const initialState = {
  user: userModel(),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setUser.actionType:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
