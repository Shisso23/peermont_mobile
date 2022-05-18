import CreateAction from '../action-utilities/action-creator';

const reducerName = 'jackpotList';

const setJackpots = CreateAction(reducerName, 'SET_JACKPOTS');
export const setJackpotsAction = setJackpots.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  jackpots: [],
  isLoading: false,
};

export const jackpotListSelector = (reducers) => reducers.jackpotListReducer;

export default function jackpotListReducer(state = initialState, action) {
  switch (action.type) {
    case setJackpots.actionType:
      return {
        ...state,
        jackpots: action.payload,
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
