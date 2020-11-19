/* eslint-disable camelcase */
export const forgotPasswordModel = ({ mobileNumber } = {}) => ({
  mobileNumber: mobileNumber || '',
});

export const apiForgotPasswordModel = ({ email } = {}) => ({
  user: {
    email: email || '',
  },
});
