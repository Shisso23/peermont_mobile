import { setLoadingAction } from '../user-reducer/user.reducer';
import {
  setMembershipCardsAction,
  removeMembershipCardAction,
  appendMembershipCardAction,
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
    dispatch(setLoadingAction(true));
    return membershipCardService.deleteMembershipCard(id).then(() => {
      dispatch(removeMembershipCardAction(id));
      dispatch(setLoadingAction(false));
    });
  };
};
