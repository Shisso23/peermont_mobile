import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  redHotSlotsUrl: () => `${apiUrl}/`,
  slotPredictionsUrl: () => `${apiUrl}/`,
  jackpotsUrl: () => `${apiUrl}/`,
  jackpotsByCasinoUrl: (casino) => `${apiUrl}/${casino}`,
  jackpotsByMachineUrl: (machine) => `${apiUrl}/${machine}`,
  jackpotsByAmountUrl: (amount) => `${apiUrl}/${amount}`,
  jackpotsByLargestUrl: () => `${apiUrl}/`,
  jackpotsBySmallestUrl: () => `${apiUrl}/`,
};
