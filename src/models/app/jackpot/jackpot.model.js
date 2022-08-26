import _ from 'lodash';
import Moment from 'moment';

export const jackpotModel = (_model = {}) => ({
  date: Moment(_.get(_model, 'DateStamp')).format('D MMM YYYY'),
  time: Moment(_.get(_model, 'DateStamp')).format('HH:mm'),
  casino: _.get(_model, 'Casino.Name', ''),
  machine: _.get(_model, 'Machine', ''),
  event: _.get(_model, 'Type.Name', ''),
  amount: _.get(_model, 'Amount', ''),
});

export const apiJackpotModel = (_model = {}) => ({
  jackpot: {
    casino_code: _.get(_model, 'casino'),
    machine_code: _.get(_model, 'machine'),
    amount: _.get(_model, 'amount'),
    upper_limit: _.get(_model, 'upperLimit'),
    lower_limit: _.get(_model, 'lowerLimit'),
  },
});

export const jackpotFormModel = (_model = {}) => ({
  casino: _.get(_model, 'casino'),
  machine: _.get(_model, 'machine'),
  range: _.get(_model, 'range', [20000, 5000000]),
});

export const predictionsFormModel = (_model = {}) => ({
  casino: _.get(_model, 'casino'),
});
