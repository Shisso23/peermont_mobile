import { setCreditCardsAction, removeCreditCardAction } from './credit-card.reducer';
import { creditCardService } from '../../services';

export const getCreditCardsAction = () => {
  return (dispatch) => {
    return creditCardService.getCreditCards().then((_creditCards) => {
      dispatch(setCreditCardsAction(_creditCards));
    });
  };
};

export const deleteCreditCardAction = (id) => {
  return (dispatch) => {
    return creditCardService.deleteCreditCard(id).then(() => {
      dispatch(removeCreditCardAction());
    });
  };
};
