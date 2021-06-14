import _ from 'lodash';

import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, userUpdateMobileOtpModel, userUpdateProfileModel } from '../../../models';
import userUrls from './user.urls';
import { constructProofOfProfileDocumentsFormData } from './user.utils';

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

const updateUserProfile = (formData) => {
  const url = userUrls.updateDetailsUrl();
  const userModal = userUpdateProfileModel(formData);
  return authNetworkService.patch(url, userModal);
};

const uploadUserProfileDocuments = (formData) => {
  const url = userUrls.updateDetailsUrl();
  const proofOfProfileDocumentsData = constructProofOfProfileDocumentsFormData(
    formData.proofOfIdDocument,
    formData.proofOfAddressDocument,
  );
  return authNetworkService.patch(url, proofOfProfileDocumentsData).catch((err) => {
    err.error = userModel(err.error);
    return Promise.reject(err);
  });
};

const verifyUpdateMobileOtpAction = (formData) => {
  const verifyUpdateMobileOtpUrl = userUrls.verifyUpdateMobileOtp();
  const verifyUpdateMobileOtpModel = userUpdateMobileOtpModel(formData);
  return authNetworkService.post(verifyUpdateMobileOtpUrl, verifyUpdateMobileOtpModel);
};

const resendUpdateMobileOtpAction = () => {
  const resendUpdateMobileOtpUrl = userUrls.resendUpdateMobileOtp();
  return authNetworkService.get(resendUpdateMobileOtpUrl);
};
const updateDailyTopUpLimit = (model) => {
  const url = userUrls.updateDailyTopUpLimit();

  return authNetworkService.patch(url, model).then((resp) => _.get(resp, 'data'));
};

export default {
  getUser,
  updateUserProfile,
  uploadUserProfileDocuments,
  verifyUpdateMobileOtpAction,
  resendUpdateMobileOtpAction,
  updateDailyTopUpLimit,
};
