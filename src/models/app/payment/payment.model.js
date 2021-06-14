import _ from 'lodash';

export const apiPaymentModel = (_model = {}) => ({
  payment: {
    subtotal: Number(_.get(_model, 'amount')),
    payment_type: _.get(_model, 'paymentType'),
    payable_id: _.get(_model, 'payableId'),
    payable_type: _.get(_model, 'payableType'),
    membership_card_id: _.get(_model, 'membershipCardId'),
  },
});
