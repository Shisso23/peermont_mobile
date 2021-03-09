import _ from 'lodash';

import inboxUrls from './inbox.urls';
import authNetworkService from '../auth-network-service/auth-network.service';

export const getInbox = () => {
  const inboxUrl = inboxUrls.inboxUrl();
  const returnInbox = (apiResponse) => _.get(apiResponse, 'data');
  return authNetworkService.get(inboxUrl).then(returnInbox);
};

export const seeInbox = (inboxId) => {
  const seeInboxUrl = inboxUrls.seeInboxUrl(inboxId);
  return authNetworkService.get(seeInboxUrl);
};

export default {
  getInbox,
  seeInbox,
};
