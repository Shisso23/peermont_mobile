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

export const numericSchema = Yup.string().matches(numberRegex, 'Can only contain digits');

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required');

export const termsAndConditionsSchema = (edit) => {
  return !edit ? Yup.bool().oneOf([true]) : Yup.string().notRequired();
};

const MEMBERSHIP_CARD_NUMBER_LEN = 18;
export const membershipCardSchema = Yup.string()
  .required('Please enter your card number.')
  .matches(numberRegex, 'Please ensure that your card number has only digits.')
  .length(MEMBERSHIP_CARD_NUMBER_LEN, `Card number is ${MEMBERSHIP_CARD_NUMBER_LEN} digits.`);

export const pinSchema = Yup.string()
  .required('Please enter your card pin.')
  .matches(numberRegex, 'Please ensure that your card pin has only digits.');

export const creditCardNumberSchema = Yup.string()
  .matches(numberRegex, 'Please ensure that your card number contains only digits')
  .required('Please enter your card number');
export const creditCardExpiryMonthSchema = Yup.string().required('Please choose expiry month');
export const creditCardExpiryYearSchema = Yup.string().required('Please choose expiry year');
export const creditCardTypeSchema = Yup.string().required('Please choose a card type');
export const creditCardHolderSchema = Yup.string().required('Card holder is required');
export const creditCardCvvSchema = Yup.string()
  .matches(numberRegex, 'Please ensure that your cvv has only digits')
  .min(3, 'cvv invalid')
  .max(4, 'cvv invalid')
  .required('cvv is required');

export const bankAccountHolderSchema = Yup.string().required('Please enter the account holder');
export const bankAccountAccountNumberSchema = Yup.string().required(
  'Please enter your account number',
);
export const bankAccountBankIdSchema = Yup.string()
  .matches(numberRegex)
  .required('Please select a bank');
export const proofOfBankDocumentSchema = Yup.string().required('Please upload proof of bank');

export const editProofOfBankDocumentSchemea = Yup.string().when('proofOfBankingStatus', {
  is: 'failed',
  then: Yup.string().required('Please re-upload your proof of bank'),
});

export const surveyAnswersSchema = Yup.array().of(
  Yup.object().shape({
    answer: Yup.bool().required('Please select'),
  }),
);

export const paymentAmountSchema = (availableBalance) =>
  Yup.number()
    .max(availableBalance, 'Payout amount cannot exeed available balance')
    .required('Please enter an amount')
    .typeError('Can only be a number');

export const topupCreditCardIdSchema = Yup.string().when('isEft', {
  is: false,
  then: Yup.string().required('Please select a payment method'),
});

export const payOutBankIdSchema = Yup.string().required('Please select a bank account');
