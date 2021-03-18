import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: (userId) => `${apiUrl}/users/${userId}`,
  userShowDetailsUrl: () => `${apiUrl}/users/show_details`,
  updateDetailsUrl: () => `${apiUrl}/users/update_details`,
};
