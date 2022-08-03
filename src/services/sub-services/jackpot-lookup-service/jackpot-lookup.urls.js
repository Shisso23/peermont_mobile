import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  redHotSlotsUrl: () => `${apiUrl}/hot_slots`,
  redHotSlotsByRankUrl: () => `${apiUrl}/hot_slots/ranked_hot_slots`,
  redHotSlotsByCasinoUrl: () => `${apiUrl}/hot_slots/hot_slots_by_casino`,
  rankedRedHotSlotsByCasinoUrl: () => `${apiUrl}/hot_slots/ranked_hot_slots_by_casino`,
  slotPredictionsUrl: () => `${apiUrl}/predictions`,
  slotPredictionsByRankUrl: () => `${apiUrl}/predictions/ranked_predictions`,
  slotPredictionsByCasinoUrl: () => `${apiUrl}/predictions/predictions_by_casino`,
  rankedslotPredictionsByCasinoUrl: () => `${apiUrl}/predictions/ranked_predictions_by_casino`,
  jackpotsUrl: () => `${apiUrl}/jackpots`,
  jackpotsByParamsUrl: () => `${apiUrl}/jackpots/jackpots_by_params`,
  jackpotsByLargestUrl: () => `${apiUrl}/jackpots/jackpots_desc`,
  jackpotsBySmallestUrl: () => `${apiUrl}/jackpots/jackpots_asc`,
};
