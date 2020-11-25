/* eslint-disable camelcase */
import moment from 'moment';

export const lastHealthSurveyModel = ({ flag, created_at } = {}) => {
  const expiryTime = moment(created_at).add('8', 'h');
  return {
    allowed: !flag,
    completedAt: created_at || '',
    expiresAt: expiryTime,
    hasExpired: expiryTime.isBefore(moment()),
  };
};
