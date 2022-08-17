import _ from 'lodash';

export const voucherModel = (_model = {}) => ({
  id: _.get(_model, 'id', ''),
  displayName: _.get(_model, 'displayName', ''),
  benefitDescription: _.get(_model, 'benefitDescription', ''),
  isIndefinite: _.get(_model, 'isIndefinite', ''),
  endDate: _.get(_model, 'endDate', ''),
});

export const apiVoucherModel = (_model = {}) => ({
  membership_card: _.get(_model, 'membershipCard'),
  tier_code: _.get(_model, 'tierCode'),
});
