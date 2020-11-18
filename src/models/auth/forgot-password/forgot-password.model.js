/* eslint-disable camelcase */
export const forgotPasswordModel = ({ email } = {}) => ({
  email: email || '',
});

export const apiForgotPasswordModel = ({ email } = {}) => ({
  user: {
    email: email || '',
  },
});
