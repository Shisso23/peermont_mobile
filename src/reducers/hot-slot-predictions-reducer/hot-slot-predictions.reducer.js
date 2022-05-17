import CreateAction from '../action-utilities/action-creator';

const reducerName = 'hotSlotPredictions';

const setRedHotSlots = CreateAction(reducerName, 'set_RED_HOT_SLOTS');
export const setRedHotSlotsAction = setRedHotSlots.action;

const setSlotPredictions = CreateAction(reducerName, 'set_SLOT_PREDICTIONS');
export const setSlotPredictionsAction = setSlotPredictions.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState = {
  redHotSlots: [],
  slotPredictions: [],
  isLoading: false,
};

export const hotSlotPredictionsSelector = (reducers) => reducers.hotSlotPredictionsReducer;

export default function hotSlotPredictionsReducer(state = initialState, action) {
  switch (action.type) {
    case setRedHotSlots.actionType:
      return {
        ...state,
        redHotSlots: action.payload,
      };
    case setSlotPredictions.actionType:
      return {
        ...state,
        slotPredictions: action.payload,
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
