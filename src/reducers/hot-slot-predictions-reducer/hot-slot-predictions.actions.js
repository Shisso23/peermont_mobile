import {
  setIsLoadingAction,
  setRedHotSlotsAction,
  setSlotPredictionsAction,
} from './hot-slot-predictions.reducer';
import { jackpotListService } from '../../services';

export const getRedHotSlotsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getRedHotSlots()
      .then((redHotSlots) => dispatch(setRedHotSlotsAction(redHotSlots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getSlotPredictionsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getSlotPredictions()
      .then((slotPredictions) => dispatch(setSlotPredictionsAction(slotPredictions)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
