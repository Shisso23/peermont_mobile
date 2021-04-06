import * as Yup from 'yup';

const numberRegex = /^[0-9]+$/;

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');
export const mobileNumberSchema = Yup.string()
  .required('Mobile number is required')
  .min(10, 'Mobile Number must be atleast 10 characters');
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
  .required('Card number is required')
  .matches(numberRegex, 'Card number can only contain digits')
  .length(MEMBERSHIP_CARD_NUMBER_LEN, `Card number must be ${MEMBERSHIP_CARD_NUMBER_LEN} digits`);

export const pinSchema = Yup.string()
  .required('Card PIN is required')
  .matches(numberRegex, 'Card PIN can only contain digits');

export const creditCardNumberSchema = Yup.string()
  .matches(numberRegex, 'Card number can only contain digits')
  .required('Card number is required');

export const creditCardExpiryDateSchema = Yup.string().required('Expiry date is required');
export const creditCardTypeSchema = Yup.string().required('Card type is required');
export const creditCardHolderSchema = Yup.string().required('Card holder is required');
export const creditCardCvvSchema = Yup.string()
  .matches(numberRegex, 'CVV can only contain digits')
  .min(3, 'CVV invalid')
  .max(4, 'CVV invalid')
  .required('CVV is required');

export const bankAccountHolderSchema = Yup.string().required('Account holder is required');
export const bankAccountAccountNumberSchema = Yup.string().required('Account number is required');
export const bankAccountBankIdSchema = Yup.string().matches(numberRegex).required('Select a bank');
export const proofOfBankDocumentSchema = Yup.string().required('Select a document above');

export const proofOfIdDocumentSchema = Yup.string().when('proofOfAddressDocument', {
  is: undefined,
  then: Yup.string().required('A document is required'),
});

export const proofOfAddressDocumentSchema = Yup.string().when('proofOfIdDocument', {
  is: undefined,
  then: Yup.string().required('A document is required'),
});

export const surveyAnswersSchema = Yup.array().of(
  Yup.object().shape({
    answer: Yup.bool().required('Select answer'),
  }),
);

export const paymentAmountSchema = (availableBalance) =>
  Yup.number()
    .max(availableBalance, 'Amount cannot exceed available balance')
    .required('Amount is required')
    .typeError('Amount can only be a number');

export const topupCreditCardIdSchema = Yup.string().when('isEft', {
  is: false,
  then: Yup.string().required('Payment method required'),
});

export const payOutBankIdSchema = Yup.string().required('Approved bank account required');
