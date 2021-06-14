import _ from 'lodash';

export const topUpModel = (_model = {}) => ({
  amount: _.get(_model, 'amount'),
  creditCardId: _.get(_model, 'creditCardId'),
  isEft: _.get(_model, 'isEft', false),
});

export const apiDailyTopUpLimitModel = (_model = {}) => ({
  user: {
    unconfirmed_daily_top_up_limit: _.get(_model, 'dailyTopUpLimit'),
  },
});
