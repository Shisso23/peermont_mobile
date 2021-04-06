import _ from 'lodash';
import store from '../../../../reducers/store';
import {
  ClientNetworkError,
  ServerNetworkError,
  ServerNotFoundError,
} from '../../../../exceptions';
import { signOutAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';

const createNetworkErrorHandlerInterceptor = (axiosInstance) => {
  const _serverResponded = (error) => {
    return error.response;
  };
  const _noResponseFromServer = (error) => {
    return error.request;
  };
  const _serverSideError = (statusCode) => statusCode >= 500;
  const _clientSideError = (statusCode) => statusCode >= 400;
  const _userIsBanned = (statusCode) => statusCode === 403;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let exception;
      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');
        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_userIsBanned(statusCode)) {
          store.dispatch(signOutAction());
        } else if (_clientSideError(statusCode)) {
          exception = new ClientNetworkError(statusCode, error.response.data);
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerNotFoundError('Network error, check your internet connection.');
      } else {
        exception = new Error('Server Error Occurred');
      }

      // eslint-disable-next-line no-console
      console.warn(exception);
      return Promise.reject(exception);
    },
  );
};
export default createNetworkErrorHandlerInterceptor;
