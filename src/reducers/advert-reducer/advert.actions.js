import { setIsLoadingAction, setSplashAdvertAction } from './advert.reducer';
import { advertService } from '../../services';

export const getSplashAdvertAction = () => {
  return (dispatch) => {
    dispatch(setIsLoadingAction(true));

    return advertService
      .getSplashAdvert()
      .then((adverts) => {
        return dispatch(setSplashAdvertAction(adverts));
      })
      .finally(() => dispatch(setIsLoadingAction(false)));
  };
};
