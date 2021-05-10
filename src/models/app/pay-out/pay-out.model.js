import _ from 'lodash';

export const payOutModel = (_model = {}) => ({
  amount: _.get(_model, 'amount'),
  bankAccountId: _.get(_model, 'bankAccountId'),
});
