import { carWashService } from '../../services';
import {
  setCarDetailsAction,
  setCarSuccessAction,
  setCarWashesAction,
  setIsLoadingAction,
  setMessagesAction,
  setVoucherAction,
  setVoucherCountAction,
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

export const getVoucherCountAction = (MembershipCard, tierCode) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .getVoucherCount(MembershipCard, tierCode)
      .then((count) => {
        dispatch(setVoucherCountAction(count));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const canClaimVoucherAction = (membershipCard, benefitId, otp) => {
  return (dispatch) => {
    return carWashService.canClaimVoucher(membershipCard, benefitId, otp).then((messages) => {
      dispatch(setMessagesAction(messages));
    });
  };
};

export const sendCanClaimOtpAction = () => {
  return () => {
    return carWashService.sendCanClaimOtp();
  };
};

export const getCarDetailsFormAction = (outletCode) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .getCarDetailsForm(outletCode)
      .then((carDetails) => {
        dispatch(setCarDetailsAction(carDetails));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};

export const submitCarDetailsAction = (carData) => {
  return (dispatch) => {
    return carWashService.submitCarWashDetails(carData).then((carSuccess) => {
      dispatch(setCarSuccessAction(carSuccess));
    });
  };
};
