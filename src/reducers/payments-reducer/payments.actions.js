import { paymentService } from '../../services';
import { setPendingPaymentIdAction, setPaymentUriActionAction } from './payments.reducer';

export const initiateTopUpAction = (topUpFormData) => {
  return (dispatch) => {
    if (topUpFormData.isEft) {
      return dispatch(eftTopUpAction(topUpFormData));
    }
    return dispatch(creditCardTopUpAction(topUpFormData));
  };
};

const eftTopUpAction = (topUpForm) => {
  return (dispatch, getState) => {
    const { currentMembershipCard } = getState().membershipCardReducer;
    return paymentService
      .createEft()
      .then((eftPayableId) =>
        paymentService.createPayment({
          amount: topUpForm.amount,
          membershipCardId: currentMembershipCard.id,
          payableId: eftPayableId,
          paymentType: 'eft_topup',
          payableType: 'InstantEft',
        }),
      )
      .then((paymentId) => {
        dispatch(setPendingPaymentIdAction(paymentId));
      });
  };
};

const creditCardTopUpAction = (topUpForm) => {
  return (dispatch, getState) => {
    const { currentMembershipCard } = getState().membershipCardReducer;
    return paymentService
      .createPayment({
        amount: topUpForm.amount,
        membershipCardId: currentMembershipCard.id,
        payableId: topUpForm.creditCardId,
        paymentType: 'credit_card_topup',
        payableType: 'CreditCard',
      })
      .then((paymentId) => {
        dispatch(setPendingPaymentIdAction(paymentId));
      });
  };
};

export const performPayoutAction = (payOutForm) => {
  return (dispatch, getState) => {
    const { currentMembershipCard } = getState().membershipCardReducer;
    return paymentService
      .createPayment({
        amount: payOutForm.amount,
        membershipCardId: currentMembershipCard.id,
        payableId: payOutForm.bankAccountId,
        paymentType: 'payout',
        payableType: 'BankAccount',
      })
      .then((paymentId) => {
        dispatch(setPendingPaymentIdAction(paymentId));
      });
  };
};

export const verifyPaymentOtpAction = (paymentOtpForm) => {
  return (_dispatch, getState) => {
    const { pendingPaymentId } = getState().paymentReducer;
    const { currentMembershipCardPin } = getState().membershipCardReducer;
    return paymentService.verifyPaymentOtp(
      paymentOtpForm,
      pendingPaymentId,
      currentMembershipCardPin,
    );
  };
};

export const getLastPaymentUriAction = () => {
  return (dispatch, getState) => {
    const { pendingPaymentId } = getState().paymentReducer;
    return paymentService.getLastPaymentUri(pendingPaymentId).then((paymentUri) => {
      dispatch(setPaymentUriActionAction(paymentUri));
    });
  };
};
