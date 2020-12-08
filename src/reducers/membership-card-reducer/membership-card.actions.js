import { setLoadingAction } from '../user-reducer/user.reducer';
import {
  setMembershipCardsAction,
  removeMembershipCardAction,
  appendMembershipCardAction,
  replaceCurrentMembershipCardAction,
  setCurrentMembershipCardPinAction,
} from './membership-card.reducer';
import { membershipCardService, encryptionService } from '../../services';

export const getMembershipCardsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return membershipCardService.getMembershipCards().then((_membershipCards) => {
      dispatch(setMembershipCardsAction(_membershipCards));
      dispatch(setLoadingAction(false));
    });
  };
};

export const getMembershipCardBalanceAction = (formData) => {
  return (dispatch, getState) => {
    const { currentMembershipCard } = getState().membershipCardReducer;
    let tempEncryptedPin;
    const clearTextPin = formData.numeric;

    return Promise.resolve(clearTextPin)
      .then(encryptionService.encryptPin)
      .then((encryptedPin) => {
        tempEncryptedPin = encryptedPin;
        return membershipCardService.getMembershipCardBalance(currentMembershipCard.id, {
          encryptedPin,
          cardNumber: currentMembershipCard.cardNumber,
        });
      })
      .then((membershipCard) => {
        dispatch(replaceCurrentMembershipCardAction(membershipCard));
        dispatch(setCurrentMembershipCardPinAction(tempEncryptedPin));
      });
  };
};

export const reloadCurrentMembershipCardBalanceAction = () => {
  return (dispatch, getState) => {
    const { currentMembershipCardPin, currentMembershipCard } = getState().membershipCardReducer;
    return membershipCardService
      .getMembershipCardBalance(currentMembershipCard.id, {
        encryptedPin: currentMembershipCardPin,
        cardNumber: currentMembershipCard.cardNumber,
      })
      .then((membershipCard) => {
        return dispatch(replaceCurrentMembershipCardAction(membershipCard));
      });
  };
};

export const createMembershipCardAction = (formData) => {
  return (dispatch) => {
    const _createNewCard = (encryptPin) =>
      membershipCardService.createMembershipCard({ encryptPin, cardNumber: formData.cardNumber });
    const _storeNewlyCreatedMembershipCard = (newCard) =>
      dispatch(appendMembershipCardAction(newCard));

    return Promise.resolve(formData.pin)
      .then(encryptionService.encryptPin)
      .then(_createNewCard)
      .then(_storeNewlyCreatedMembershipCard);
  };
};

export const deleteMembershipCardAction = (id) => {
  return (dispatch) => {
    return membershipCardService.deleteMembershipCard(id).then(() => {
      dispatch(removeMembershipCardAction(id));
    });
  };
};
