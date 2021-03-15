import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userShowDetailsUrl: () => `${apiUrl}/users/show_details`,
  userUrl: (userId) => `${apiUrl}/users/${userId}`,
};
