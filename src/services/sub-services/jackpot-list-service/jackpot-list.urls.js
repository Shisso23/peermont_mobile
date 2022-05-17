import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  redHotSlotsUrl: () => `${apiUrl}/`,
  slotPredictionsUrl: () => `${apiUrl}/`,
};
