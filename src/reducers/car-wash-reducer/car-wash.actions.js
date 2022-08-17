import { carWashService } from '../../services';
import { setIsLoadingAction, setVouchersAction } from './car-wash.reducer';

export const getAvailableCarWashesAction = (MembershipCard, tierCode) => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));
    return carWashService
      .getAvailableCarWashes(MembershipCard, tierCode)
      .then((vouchers) => dispatch(setVouchersAction(vouchers)))
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
