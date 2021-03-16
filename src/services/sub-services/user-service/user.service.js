import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, userFirebaseTokenModal } from '../../../models';
import userUrls from './user.urls';

const getUser = () => {
  const url = userUrls.userShowDetailsUrl();
  const _createAndReturnUserModel = (apiResponse) => {
    return userModel(apiResponse.data);
  };

  return authNetworkService
    .get(url)
    .then(_createAndReturnUserModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const updateFirebaseToken = (userId, firebaseToken) => {
  const url = userUrls.userUrl(userId);
  const fireBaseModel = userFirebaseTokenModal(firebaseToken);

  return authNetworkService.put(url, fireBaseModel);
};

export default {
  getUser,
  updateFirebaseToken,
};
