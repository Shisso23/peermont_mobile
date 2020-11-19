import { setCreditCardsAction } from './credit-card.reducer';
import { creditCardService } from '../../services';

export const getCreditCardsAction = () => {
  return (dispatch) => {
    return creditCardService.getCreditCards().then((_creditCards) => {
      dispatch(setCreditCardsAction(_creditCards));
    });
  };
};
