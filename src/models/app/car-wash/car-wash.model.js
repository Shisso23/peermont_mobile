import _ from 'lodash';
import Moment from 'moment';

export const voucherModel = (_model = {}) => ({
  id: _.get(_model, 'id', ''),
  displayName: _.get(_model, 'displayName', ''),
  benefitDescription: _.get(_model, 'benefitDescription', ''),
  isIndefinite: _.get(_model, 'isIndefinite', ''),
  endDate: _.get(_model, 'endDate', ''),
});

export const claimedCarWashModel = (_model = {}) => ({
  id: _.get(_model, 'id', ''),
  displayName: _.get(_model, 'displayName', ''),
  benefitDescription: _.get(_model, 'benefitDescription', ''),
  claimedDate: Moment(_.get(_model, 'claimedDateTime')).format('D MMM YYYY  HH:mm'),
});

export const apiVoucherModel = (_model = {}) => ({
  membership_card: _.get(_model, 'membershipCard'),
  tier_code: _.get(_model, 'tierCode'),
  outlet_code: _.get(_model, 'qrCode'),
  benefit_id: _.get(_model, 'benefitId'),
  otp: _.get(_model, 'otp'),
});

export const carWashMessageModel = (_model = {}) => ({
  succeeded: _.get(_model, 'succeeded', ''),
  messages: _.get(_model, 'messages', ''),
});

export const qrModel = (_model = {}) => ({
  qrCode: _.get(_model, 'qrCode'),
});
