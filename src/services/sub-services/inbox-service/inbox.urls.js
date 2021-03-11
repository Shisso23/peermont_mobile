import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  inboxUrl: () => `${apiUrl}/inboxes/`,
  seeInboxUrl: (inboxId) => `${apiUrl}/inboxes/${inboxId}/see`,
};
