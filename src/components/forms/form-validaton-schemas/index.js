import * as Yup from 'yup';

const numberRegex = /^[0-9]+$/;

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');
export const mobileNumberSchema = Yup.string().required('Please enter a mobile number');
export const passwordSchema = Yup.string().required('Password is required');

export const registerPasswordSchema = (edit) => {
  return !edit
    ? Yup.string()
        .min(6, 'Minimum of 6 characters needed for password')
        .required('Password is required')
    : Yup.string().notRequired();
};

export const confirmPasswordSchema = (edit) => {
  return !edit
    ? Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    : Yup.string().notRequired();
};

export const termsAndConditionsSchema = (edit) => {
  return !edit ? Yup.bool().oneOf([true]) : Yup.string().notRequired();
};

const MEMBERSHIP_CARD_NUMBER_LEN = 18;
export const cardSchema = Yup.string()
  .required('Please enter your card number.')
  .matches(numberRegex, 'Please ensure that your card number has only digits.')
  .length(MEMBERSHIP_CARD_NUMBER_LEN, `Card number is ${MEMBERSHIP_CARD_NUMBER_LEN} digits.`);

export const pinSchema = Yup.string()
  .required('Please enter your card pin.')
  .matches(numberRegex, 'Please ensure that your card pin has only digits.');
