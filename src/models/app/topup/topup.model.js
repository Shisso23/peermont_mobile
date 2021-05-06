import _ from 'lodash';

export const topUpModel = ({ amount, creditCardId, isEft } = {}) => ({
  amount: amount || '',
  creditCardId: creditCardId || '',
  isEft: isEft || false,
});

export const apiDailyTopUpLimitModel = (_topUpModel = {}) => ({
  user: {
    unconfirmed_daily_top_up_limit: _.get(_topUpModel, 'dailyTopUpLimit'),
  },
});
