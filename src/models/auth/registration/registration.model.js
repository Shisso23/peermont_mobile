/* eslint-disable camelcase */
export const registrationUserModel = ({
  email,
  name,
  password,
  password_confirmation,
  terms_and_conditions,
} = {}) => ({
  email: email || '',
  name: name || '',
  password: password || '',
  confirmPassword: password_confirmation || '',
  termsAndConditions: terms_and_conditions || true,
});

export const apiRegistrationUserModel = ({
  email,
  name,
  password,
  confirmPassword,
  termsAndConditions,
} = {}) => ({
  user: {
    email: email || '',
    name: name || '',
    password: password || '',
    password_confirmation: confirmPassword || '',
    terms_and_conditions: termsAndConditions || true,
  },
});
