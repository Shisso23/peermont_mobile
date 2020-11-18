import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, apiUserModel } from '../../../models';
import userUrls from './user.urls';

const getUser = () => {
  const url = userUrls.userUrl();
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

const updateUser = ({ formData }) => {
  const url = userUrls.userUrl();
  const apiUser = apiUserModel(formData);
  return authNetworkService.patch(url, apiUser).catch((error) => {
    error.errors = userModel(error.errors);
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  getUser,
  updateUser,
};
