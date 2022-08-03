import { setIsLoadingAction, setJackpotsAction } from './jackpot-list.reducer';
import { jackpotLookupService } from '../../services';

export const getJackpotsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpots()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByCasinoAction = (casino) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsByCasino(casino)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByMachineAction = (casino, machine) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsByMachine(casino, machine)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByAmountAction = (amount) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsByAmount(amount)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByRangeAction = (lowerLimit, upperLimit) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsByRange(lowerLimit, upperLimit)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByLargestAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsByLargest()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsBySmallestAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotLookupService
      .getJackpotsBySmallest()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
