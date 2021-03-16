import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  inboxUrl: () => `${apiUrl}/inboxes/`,
  seeInboxUrl: (inboxLinkId) => `${apiUrl}/inboxes/see?inbox_link_id=${inboxLinkId}`,
};
