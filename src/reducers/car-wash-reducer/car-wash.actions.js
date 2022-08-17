import { carWashService } from '../../services';
import { setCarWashesAction, setIsLoadingAction, setVouchersAction } from './car-wash.reducer';

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
