import _ from 'lodash';

export default class ServerNetworkError extends Error {
  constructor(statusCode, error) {
    super(error);

    this.message = _.get(error, 'error', `Request failed with status code ${statusCode}`);
    this.errors = _.get(error, 'errors');
    this.statusCode = statusCode;
    this.name = 'ServerNetworkError';
  }
}
