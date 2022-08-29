import { carWashService } from '../../services';
import {
  setCarWashesAction,
  setIsLoadingAction,
  setMessagesAction,
  setVoucherAction,
  setVouchersAction,
} from './car-wash.reducer';

export const getAvailableCarWashesAction = (MembershipCard, tierCode) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .getAvailableCarWashes(MembershipCard, tierCode)
      .then((vouchers) => dispatch(setVouchersAction(vouchers)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const getClaimHistoryAction = (MembershipCard) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .getClaimHistory(MembershipCard)
      .then((carWashes) => dispatch(setCarWashesAction(carWashes)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const claimCarWashVoucherAction = (MembershipCard, tierCode, qrCode, benefitId) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .claimCarWashVoucher(MembershipCard, tierCode, qrCode, benefitId)
      .then((messages) => {
        dispatch(setMessagesAction(messages));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const setCurrentVoucher = (voucher) => {
  return (dispatch) => {
    return dispatch(setVoucherAction(voucher));
  };
};
