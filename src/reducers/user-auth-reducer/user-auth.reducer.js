import CreateAction from '../action-utilities/action-creator';

const reducerName = 'user-auth';

const setIsAuthenticated = CreateAction(reducerName, 'SET_IS_AUTHENTICATED');
export const setIsAuthenticatedAction = setIsAuthenticated.action;

const setTemporaryToken = CreateAction(reducerName, 'SET_TEMP_TOKEN');
export const setTemporaryTokenAction = setTemporaryToken.action;

const initialState = {
  isAuthenticated: false,
  token: null,
};

export default function userAuthReducer(state = initialState, action) {
  switch (action.type) {
    case setIsAuthenticated.actionType:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case setTemporaryToken.actionType:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}
