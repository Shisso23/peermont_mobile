import {
  setIsLoadingAction,
  setRedHotSlotsAction,
  setSlotPredictionsAction,
} from './hot-slot-predictions.reducer';
import { jackpotLookupService } from '../../services';

export const getRedHotSlotsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getRedHotSlots()
      .then((redHotSlots) => dispatch(setRedHotSlotsAction(redHotSlots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getRankedRedHotSlotsByCasinoAction = (casino) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getRankedRedHotSlotsByCasino(10, casino)
      .then((redHotSlots) => dispatch(setRedHotSlotsAction(redHotSlots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getSlotPredictionsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getSlotPredictions()
      .then((slotPredictions) => dispatch(setSlotPredictionsAction(slotPredictions)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getRankedPredictionsByCasinoAction = (casino) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getRankedSlotPredictionsByCasino(10, casino)
      .then((slotPredictions) => dispatch(setSlotPredictionsAction(slotPredictions)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
