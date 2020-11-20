import authNetworkService from '../auth-network-service/auth-network.service';
import membershipCardUrls from './membership-card.urls';
import { userMembershipCardModel } from '../../../models';

const getMembershipCards = () => {
  const url = membershipCardUrls.membershipCardsUrl();
  const _createAndReturnMembershipCardModel = (apiResponse) => {
    return userMembershipCardModel(apiResponse.data);
  };
  return authNetworkService
    .get(url)
    .then(_createAndReturnMembershipCardModel)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const deleteMembershipCard = (id) => {
  const url = membershipCardUrls.membershipCardUrl(id);
  return authNetworkService
    .delete(url)
    .then()
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

export default {
  getMembershipCards,
  deleteMembershipCard,
};
