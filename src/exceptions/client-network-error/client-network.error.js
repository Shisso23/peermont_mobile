import _ from 'lodash';

class ClientNetworkError extends Error {
  constructor(statusCode, error) {
    super(error);
    this.message = _.get(error, 'error', `Request failed with status code ${statusCode}`);
    this.errors = _.get(error, 'errors');
    this.statusCode = statusCode;
    this.name = 'ClientNetworkError';
  }
}
export default ClientNetworkError;
