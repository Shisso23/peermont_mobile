import _ from 'lodash';

export const hotSlotPredictionsModel = (_model = {}) => ({
  casino: _.get(_model, 'Casino.Name', ''),
  machine: _.get(_model, 'MachineNumber', ''),
  area: _.get(_model, 'AreaName', ''),
  gameName: _.get(_model, 'GameName', ''),
  ranking: _.get(_model, 'Ranking', ''),
  denom: _.get(_model, 'DenominationValue', ''),
});

export const apihotSlotModel = (_model = {}) => ({
  hot_slot: {
    casino_code: _.get(_model, 'casino'),
    rank: _.get(_model, 'ranking'),
  },
});

export const apiPredictionsModel = (_model = {}) => ({
  prediction: {
    casino_code: _.get(_model, 'casino'),
    rank: _.get(_model, 'ranking'),
  },
});
