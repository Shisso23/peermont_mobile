import _ from 'lodash';

import jackpotLookupUrls from './jackpot-lookup.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiJackpotModel } from '../../../models';
import { apihotSlotModel } from '../../../models/app/hot-slot-predictions/hot-slot-predictions.model';

export const getRedHotSlots = () => {
  const jackpotUrl = jackpotLookupUrls.redHotSlotsUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnHotSlots);
};

export const getRedHotSlotsByRank = (ranking) => {
  const apiModel = apihotSlotModel({ ranking });
  const hotSlotUrl = jackpotLookupUrls.redHotSlotsByRankUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getRedHotSlotsByCasino = (casino) => {
  const apiModel = apihotSlotModel({ casino });
  const hotSlotUrl = jackpotLookupUrls.redHotSlotsByCasinoUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getRankedRedHotSlotsByCasino = (ranking, casino) => {
  const apiModel = apihotSlotModel({ ranking, casino });
  const hotSlotUrl = jackpotLookupUrls.rankedRedHotSlotsByCasinoUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getSlotPredictions = () => {
  const jackpotUrl = jackpotLookupUrls.slotPredictionsUrl();
  const returnSlotPredictions = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnSlotPredictions);
};

export const getSlotPredictionsByRank = (ranking) => {
  const apiModel = apihotSlotModel({ ranking });
  const hotSlotUrl = jackpotLookupUrls.redHotSlotsByRankUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getSlotPredictionsByCasino = (casino) => {
  const apiModel = apihotSlotModel({ casino });
  const hotSlotUrl = jackpotLookupUrls.redHotSlotsByCasinoUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getRankedSlotPredictionsByCasino = (ranking, casino) => {
  const apiModel = apihotSlotModel({ ranking, casino });
  const hotSlotUrl = jackpotLookupUrls.rankedRedHotSlotsByCasinoUrl();
  const returnHotSlots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(hotSlotUrl, apiModel).then(returnHotSlots);
};

export const getJackpots = () => {
  const jackpotUrl = jackpotLookupUrls.jackpotsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsByCasino = (casino) => {
  const apiModel = apiJackpotModel({ casino });
  const jackpotUrl = jackpotLookupUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByMachine = (casino, machine) => {
  const apiModel = apiJackpotModel({ casino, machine });
  const jackpotUrl = jackpotLookupUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByAmount = (amount) => {
  const apiModel = apiJackpotModel({ amount });
  const jackpotUrl = jackpotLookupUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByRange = (lowerLimit, upperLimit) => {
  const apiModel = apiJackpotModel({ lowerLimit, upperLimit });
  const jackpotUrl = jackpotLookupUrls.jackpotsByParamsUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.post(jackpotUrl, apiModel).then(returnJackpots);
};

export const getJackpotsByLargest = () => {
  const jackpotUrl = jackpotLookupUrls.jackpotsByLargestUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export const getJackpotsBySmallest = () => {
  const jackpotUrl = jackpotLookupUrls.jackpotsBySmallestUrl();
  const returnJackpots = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(jackpotUrl).then(returnJackpots);
};

export default {
  getRedHotSlots,
  getRedHotSlotsByRank,
  getRedHotSlotsByCasino,
  getRankedRedHotSlotsByCasino,
  getSlotPredictions,
  getSlotPredictionsByRank,
  getSlotPredictionsByCasino,
  getRankedSlotPredictionsByCasino,
  getJackpots,
  getJackpotsByCasino,
  getJackpotsByMachine,
  getJackpotsByLargest,
  getJackpotsByAmount,
  getJackpotsByRange,
  getJackpotsBySmallest,
};
