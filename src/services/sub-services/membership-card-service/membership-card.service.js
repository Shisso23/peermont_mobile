import authNetworkService from '../auth-network-service/auth-network.service';
import membershipCardUrls from './membership-card.urls';
import {
  userMembershipCardModel,
  membershipCardModel,
  apiMembershipCardModel,
} from '../../../models';

const _createAndReturnUserMembershipCardModel = (apiResponse) => {
  return userMembershipCardModel(apiResponse.data);
};

const getMembershipCards = () => {
  const url = membershipCardUrls.membershipCardsUrl();
  return authNetworkService
    .get(url)
    .then(_createAndReturnUserMembershipCardModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const createMembershipCard = (formData) => {
  const membershipCardsUrl = membershipCardUrls.membershipCardsUrl();
  const apiModel = apiMembershipCardModel(formData);
  return authNetworkService
    .post(membershipCardsUrl, apiModel)
    .then(_createAndReturnUserMembershipCardModel)
    .catch((err) => {
      err.errors = membershipCardModel(err.errors);
      return Promise.reject(err);
    });
};

const deleteMembershipCard = (id) => {
  const url = membershipCardUrls.membershipCardUrl(id);
  return authNetworkService.delete(url).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  getMembershipCards,
  createMembershipCard,
  deleteMembershipCard,
};
