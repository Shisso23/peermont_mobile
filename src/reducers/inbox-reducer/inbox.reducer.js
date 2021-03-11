import CreateAction from '../action-utilities/action-creator';

const reducerName = 'inbox';

const setInbox = CreateAction(reducerName, 'SET_INBOX');
export const setInboxAction = setInbox.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  inbox: [],
  isLoading: false,
};

export default function inboxReducer(state = initialState, action) {
  switch (action.type) {
    case setInbox.actionType:
      return {
        ...state,
        inbox: action.payload,
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
