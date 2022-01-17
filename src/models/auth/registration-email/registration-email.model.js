/* eslint-disable camelcase */
export const registrationEmailModel = ({ unconfirmed_email } = {}) => ({
  unconfirmed_email: unconfirmed_email || '',
});

export const apiRegistrationEmailModel = ({ unconfirmed_email } = {}, token) => ({
  unconfirmed_email: unconfirmed_email || '',
  token: token || '',
});
