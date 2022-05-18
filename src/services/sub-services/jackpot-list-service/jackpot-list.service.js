import _ from 'lodash';

import jackpotListUrls from './jackpot-list.urls';
import authNetworkService from '../auth-network-service/auth-network.service';

export const getRedHotSlots = () => {
  const jackpotUrl = jackpotListUrls.redHotSlotsUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnHotSlots);
};

export const getSlotPredictions = () => {
  const jackpotUrl = jackpotListUrls.slotPredictionsUrl();
  const returnSlotPredictions = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnSlotPredictions);
};

export const getJackpots = () => {
  const jackpotUrl = jackpotListUrls.jackpotsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsByCasino = (casino) => {
  const jackpotUrl = jackpotListUrls.jackpotsByCasinoUrl(casino);
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsByMachine = (machine) => {
  const jackpotUrl = jackpotListUrls.jackpotsByMachineUrl(machine);
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsByAmount = (amount) => {
  const jackpotUrl = jackpotListUrls.jackpotsByAmountUrl(amount);
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsByLargest = () => {
  const jackpotUrl = jackpotListUrls.jackpotsByLargestUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsBySmallest = () => {
  const jackpotUrl = jackpotListUrls.jackpotsBySmallestUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export default {
  getRedHotSlots,
  getSlotPredictions,
  getJackpots,
  getJackpotsByCasino,
  getJackpotsByMachine,
  getJackpotsByLargest,
  getJackpotsByAmount,
  getJackpotsBySmallest,
};
