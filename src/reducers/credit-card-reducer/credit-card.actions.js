import { setLoadingAction } from '../user-reducer/user.reducer';
import { setCreditCardsAction, removeCreditCardAction } from './credit-card.reducer';
import { creditCardService } from '../../services';

export const getCreditCardsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return creditCardService.getCreditCards().then((_creditCards) => {
      dispatch(setCreditCardsAction(_creditCards));
      dispatch(setLoadingAction(false));
    });
  };
};

export const deleteCreditCardAction = (id) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return creditCardService.deleteCreditCard(id).then(() => {
      dispatch(removeCreditCardAction());
      dispatch(setLoadingAction(false));
    });
  };
};
