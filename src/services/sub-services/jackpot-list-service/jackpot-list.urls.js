import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  redHotSlotsUrl: () => `${apiUrl}/`,
  slotPredictionsUrl: () => `${apiUrl}/`,
  jackpotsUrl: () => `${apiUrl}/jackpots`,
  jackpotsByParamsUrl: () => `${apiUrl}/jackpots/jackpots_by_params`,
  jackpotsByLargestUrl: () => `${apiUrl}/jackpots/jackpots_desc`,
  jackpotsBySmallestUrl: () => `${apiUrl}/jackpots/jackpots_asc`,
};
