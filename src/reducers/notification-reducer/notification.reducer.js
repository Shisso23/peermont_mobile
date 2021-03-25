import CreateAction from '../action-utilities/action-creator';

const reducerName = 'notification';

const setNotification = CreateAction(reducerName, 'SET_NOTIFICATION');
export const setNotificationAction = setNotification.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  notification: [],
  isLoading: false,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case setNotification.actionType:
      return {
        ...state,
        notification: action.payload,
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
