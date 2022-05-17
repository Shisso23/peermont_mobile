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

export default {
  getRedHotSlots,
  getSlotPredictions,
};
