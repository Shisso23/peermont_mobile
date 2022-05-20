import { setIsLoadingAction, setJackpotsAction } from './jackpot-list.reducer';
import { jackpotListService } from '../../services';

export const getJackpotsAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpots()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByCasinoAction = (casino) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpotsByCasino(casino)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByMachineAction = (casino, machine) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpotsByMachine(casino, machine)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByAmountAction = (amount) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpotsByAmount(amount)
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsByLargestAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpotsByLargest()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getJackpotsBySmallestAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return jackpotListService
      .getJackpotsBySmallest()
      .then((jackpots) => dispatch(setJackpotsAction(jackpots)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
