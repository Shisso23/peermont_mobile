import { paymentService } from '../../services';
import {
  setPendingPaymentIdAction,
  setPaymentUriActionAction,
  setTransactionsAction,
  setIsLoadingAction,
} from './payments.reducer';

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
    dispatch(setIsLoadingAction(true));

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
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

const creditCardTopUpAction = (topUpForm) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

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
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const performPayoutAction = (payOutForm) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

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
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const sendPaymentOtpAction = (sendTo) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

    const { pendingPaymentId } = getState().paymentReducer;
    return paymentService
      .sendPaymentOtp(pendingPaymentId, sendTo)
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const verifyPaymentOtpAction = (paymentOtpForm) => {
  return (dispatch, getState) => {
    dispatch(setIsLoadingAction(true));

    const { pendingPaymentId } = getState().paymentReducer;
    const { currentMembershipCardPin } = getState().membershipCardReducer;
    return paymentService
      .verifyPaymentOtp(paymentOtpForm, pendingPaymentId, currentMembershipCardPin)
      .finally(() => dispatch(setIsLoadingAction(false)));
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

export const getTransactions = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return paymentService
      .getTransactions()
      .then((transactions) => dispatch(setTransactionsAction(transactions)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
