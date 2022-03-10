import _ from 'lodash';
import Moment from 'moment';

export const apiPaymentModel = (_model = {}) => ({
  payment: {
    subtotal: Number(_.get(_model, 'amount')),
    payment_type: _.get(_model, 'paymentType'),
    payable_id: _.get(_model, 'payableId'),
    payable_type: _.get(_model, 'payableType'),
    payment_provider: _.get(_model, 'paymentProvider'),
    membership_card_id: _.get(_model, 'membershipCardId'),
  },
});

const getPayableNumber = (item) => {
  const bank = _.get(item, 'payable.bank_account.account_number', null);
  const creditCard = _.get(item, 'payable.credit_card.obfuscated_card_number', null);

  if (!_.isNull(bank)) {
    return bank;
  }
  return creditCard;
};

const formatPaymentType = (paymentType) => {
  switch (paymentType) {
    case 'eft_topup':
      return 'Top Up';
    case 'credit_card_topup':
      return 'Top Up';
    case 'payout':
      return 'Payout';
    default:
      return null;
  }
};

const formatPayableType = (payableType) => {
  switch (payableType) {
    case 'CreditCard':
      return 'Credit card';
    case 'InstantEft':
      return 'Instant EFT';
    case 'BankAccount':
      return 'Bank Account';
    default:
      return payableType;
  }
};

export const paymentTransactionModel = (_model = {}) => ({
  paymentProvider: _.get(_model, 'payment_provider'),
  payableType: formatPayableType(_.get(_model, 'payable_type')),
  updatedAt: Moment(_.get(_model, 'updated_at')).format('YYYY/MM/DD, HH:MM'),
  payable: getPayableNumber(_model),
  amount: (_.get(_model, 'total.cents') / 100).toFixed(2),
  status: _.capitalize(_.get(_model, 'status')),
  paymentType: formatPaymentType(_.get(_model, 'payment_type')),
  bank: _.get(_model, 'bank'),
});
