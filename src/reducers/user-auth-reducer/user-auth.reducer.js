import CreateAction from '../action-utilities/action-creator';

const reducerName = 'user-auth';

const setIsAuthenticated = CreateAction(reducerName, 'SET_IS_AUTHENTICATED');
export const setIsAuthenticatedAction = setIsAuthenticated.action;

const initialState = {
  isAuthenticated: false,
};

export default function userAuthReducer(state = initialState, action) {
  switch (action.type) {
    case setIsAuthenticated.actionType:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
