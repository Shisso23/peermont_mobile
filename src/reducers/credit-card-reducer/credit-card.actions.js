import {
  setCreditCardsAction,
  setLoadingAction,
  removeCreditCardAction,
  appendCreditCardAction,
} from './credit-card.reducer';
import { creditCardService } from '../../services';

export const getCreditCardsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));

    return creditCardService
      .getCreditCards()
      .then((_creditCards) => {
        dispatch(setCreditCardsAction(_creditCards));
      })
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const createCreditCardAction = (formData) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));

    const _storeNewlyCreatedCreditCard = (newCreditCard) =>
      dispatch(appendCreditCardAction(newCreditCard));

    return creditCardService
      .createCreditCard(formData)
      .then(_storeNewlyCreatedCreditCard)
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const deleteCreditCardAction = (id) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return creditCardService.deleteCreditCard(id).then(() => {
      dispatch(removeCreditCardAction(id));
      dispatch(setLoadingAction(false));
    });
  };
};
