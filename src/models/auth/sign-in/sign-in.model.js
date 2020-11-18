/* eslint-disable camelcase */
export const signInModel = ({ email, password } = {}) => ({
  email: email || '',
  password: password || '',
});

export const apiSignInModel = ({ email, password } = {}) => ({
  email: email || '',
  password: password || '',
});
