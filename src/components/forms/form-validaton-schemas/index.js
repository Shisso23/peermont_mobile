import * as Yup from 'yup';
import _ from 'lodash';
import { luhnChecksum } from '../../../helpers/credit-card.helper';

const numberRegex = /^[0-9]+$/;

export const emailSchema = Yup.string().required('Email is required').email('Invalid Email').trim();

export const registerEmailSchema = Yup.string()
  .required('Email is required')
  .email('Invalid Email')
  .trim();

export const mobileNumberSchema = Yup.string()
  .required('Mobile number is required')
  .min(10, 'Mobile Number must be atleast 10 characters');

export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(4, 'Minimum of 4 characters needed for password');

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

export const creditCardNumberSchema = Yup.mixed()
  .required('Card number is required. ')
  .test({
    name: 'luhnAlgorithm',
    message: 'Invalid credit card. ',
    test: (value) => luhnChecksum(value),
  });

export const creditCardExpiryYearSchema = Yup.string().required('Expiry year is required. ');
export const creditCardExpiryMonthSchema = Yup.string().required('Expiry month is required. ');
export const creditCardTypeSchema = Yup.string().required('Card type unrecognised. ');
export const creditCardHolderSchema = Yup.string().required('Card holder is required. ');
export const creditCardCvvSchema = Yup.string()
  .matches(numberRegex, 'CVV can only contain digits')
  .min(3, 'CVV invalid. ')
  .max(4, 'CVV invalid. ')
  .required('CVV is required. ');

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

export const topupCreditCardIdSchema = Yup.string().when(['isEft', 'isOzowEft', 'isZapperEft'], {
  is: (isEft, isOzowEft, isZapperEft) => !isEft && !isOzowEft && !isZapperEft,
  then: Yup.string().required('Payment method required'),
});

export const machineSchema = Yup.string().matches(/^[0-9]+$/, 'Only numbers permitted');

export const casinoSchema = Yup.string().when(['machine'], {
  is: (machine) => !_.isUndefined(machine),
  then: Yup.string().required('Casino is required to filter by machine.'),
});

export const casinoSelectSchema = Yup.string().required('A casino is required');

export const payOutBankIdSchema = Yup.string().required('Approved bank account required');

export const dailyTopUpLimitSchema = Yup.number()
  .max('1000000', 'Daily top up limit cannot exceed 1000000')
  .required('Limit is required')
  .typeError('Limit can only be a number');
