import authNetworkService from '../auth-network-service/auth-network.service';
import { membershipCardModel, apiMembershipCardModel } from '../../../models';
import membershipCardUrls from './bank-account.urls';

const getMembershipCards = () => {
  const url = membershipCardUrls.membershipCardsUrl();
  const _createAndReturnMembershipCardModel = (apiResponse) => {
    return membershipCardModel(apiResponse.data);
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

export default {
  getMembershipCards,
};
