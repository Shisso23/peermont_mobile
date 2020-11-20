/* eslint-disable camelcase */
export const setPasswordModel = ({ password, password_confirmation } = {}) => ({
  password: password || '',
  confirmPassword: password_confirmation || '',
});

export const apiSetPasswordModel = ({ password } = {}, token) => ({
  password: password || '',
  token: token || '',
});
