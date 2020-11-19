import _ from 'lodash';
import {
  ClientNetworkError,
  ServerNetworkError,
  ServerNotFoundError,
} from '../../../../exceptions';

const createNetworkErrorHandlerInterceptor = (axiosInstance) => {
  const _serverResponded = (error) => {
    return error.response;
  };
  const _noResponseFromServer = (error) => {
    return error.request;
  };
  const _serverSideError = (statusCode) => statusCode >= 500;
  const _clientSideError = (statusCode) => statusCode >= 400;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let exception;
      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');
        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_clientSideError(statusCode)) {
          exception = new ClientNetworkError(statusCode, error.response.data);
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerNotFoundError('Server is probably offline');
      } else {
        exception = new Error('Something terrible happened');
      }

      // eslint-disable-next-line no-console
      console.warn(exception);
      return Promise.reject(exception);
    },
  );
};
export default createNetworkErrorHandlerInterceptor;
