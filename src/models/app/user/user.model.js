/* eslint-disable camelcase */
export const userModel = ({ email, name } = {}) => ({
  email: email || '',
  name: name || '',
});

export const apiUserModel = ({ email, name } = {}) => ({
  user: {
    email: email || '',
    name: name || '',
  },
});
