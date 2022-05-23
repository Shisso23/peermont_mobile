import _ from 'lodash';

import jackpotListUrls from './jackpot-list.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiJackpotModel } from '../../../models';

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
  const apiModel = apiJackpotModel({ casino });
  const jackpotUrl = jackpotListUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByMachine = (casino, machine) => {
  const apiModel = apiJackpotModel({ casino, machine });
  const jackpotUrl = jackpotListUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByAmount = (amount) => {
  const apiModel = apiJackpotModel({ amount });
  const jackpotUrl = jackpotListUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByRange = (lowerLimit, upperLimit) => {
  const apiModel = apiJackpotModel({ lowerLimit, upperLimit });
  const jackpotUrl = jackpotListUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
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
  getJackpotsByRange,
  getJackpotsBySmallest,
};
