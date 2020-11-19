import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';

const reducerName = 'user';

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;

const setLoading = CreateAction(reducerName, 'SET_LOADING');
export const setLoadingAction = setLoading.action;

const initialState = {
  user: userModel(),
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case setUser.actionType:
      return {
        ...state,
        user: action.payload,
      };
    case setLoading.actionType:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
