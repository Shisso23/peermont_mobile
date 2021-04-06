import { useDispatch } from 'react-redux';

import { userAuthService } from '../../services';
import { loadAppDataForSignedInUserAction } from '../../reducers/app-reducer/app.actions';

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const authenticate = (onSuccess = () => {}, onFinally = () => {}) => {
    userAuthService
      .doTokensExistInLocalStorage()
      .then((tokensExist) => {
        if (tokensExist) {
          return dispatch(loadAppDataForSignedInUserAction()).then(onSuccess);
        }
        return Promise.resolve();
      })
      .finally(onFinally);
  };

  return {
    authenticate,
  };
};
