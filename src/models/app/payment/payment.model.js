/* eslint-disable camelcase */

export const apiPaymentModel = ({
  amount,
  membershipCardId,
  payableId,
  paymentType,
  payableType,
} = {}) => ({
  payment: {
    subtotal: Number(amount) || '',
    payment_type: paymentType || '',
    payable_id: payableId || '',
    payable_type: payableType || '',
    membership_card_id: membershipCardId || '',
  },
});
