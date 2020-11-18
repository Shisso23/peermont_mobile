import _ from 'lodash';

export default class NetworkError extends Error {
  constructor(statusCode, error) {
    super(error);

    this.message = _.get(error, 'error');
    this.errors = _.get(error, 'errors');
    this.statusCode = statusCode;
  }
}
