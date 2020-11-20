/* eslint-disable camelcase */
export const resetPasswordSetPasswordModel = ({ password, password_confirmation } = {}) => ({
  password: password || '',
  confirmPassword: password_confirmation || '',
});

export const apiResetPasswordSetPasswordModel = ({ password } = {}, token) => ({
  password: password || '',
  token: token || '',
});
