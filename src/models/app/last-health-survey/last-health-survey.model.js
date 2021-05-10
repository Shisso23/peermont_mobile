import moment from 'moment';
import _ from 'lodash';

export const lastHealthSurveyModel = (_model = {}) => {
  const expiryTime = moment(_.get(_model, 'created_at')).add('8', 'h');
  return {
    allowed: !_.get(_model, 'flag'),
    completedAt: _.get(_model, 'created_at') || '',
    expiresAt: expiryTime,
    hasExpired: expiryTime.isBefore(moment()),
  };
};
