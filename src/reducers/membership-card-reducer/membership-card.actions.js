import _ from 'lodash';

import { setLoadingAction } from '../user-reducer/user.reducer';
import {
  setMembershipCardsAction,
  removeMembershipCardAction,
  appendMembershipCardAction,
  replaceCurrentMembershipCardAction,
  setCurrentMembershipCardPinAction,
  setMembershipCardPinsAction,
  setIsLoadingAction as setMembershipCardIsLoading,
  setIsLoadingPointsAction,
  setPointsBalancesAction,
} from './membership-card.reducer';
import { membershipCardService, encryptionService } from '../../services';

export const getMembershipCardsAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return membershipCardService
      .getMembershipCards()
      .then((_membershipCards) => {
        dispatch(setMembershipCardsAction(_membershipCards));
      })
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const getMembershipCardBalanceAction = (formData) => {
  return (dispatch, getState) => {
    const { currentMembershipCard } = getState().membershipCardReducer;
    let tempEncryptedPin;
    const clearTextPin = formData.numeric;

    dispatch(setMembershipCardIsLoading(true));

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
        dispatch(getMembershipCardPointsAction());
      })
      .finally(() => dispatch(setMembershipCardIsLoading(false)));
  };
};

export const getMembershipCardPointsAction = () => (dispatch, getState) => {
  const { currentMembershipCard, currentMembershipCardPin } = getState().membershipCardReducer;
  dispatch(setIsLoadingPointsAction(true));

  return membershipCardService
    .getMembershipCardPoints(currentMembershipCard.id, {
      encryptedPin: currentMembershipCardPin,
      cardNumber: currentMembershipCard.cardNumber,
    })
    .then((data) => {
      dispatch(setPointsBalancesAction(data));
    })
    .finally(() => dispatch(setIsLoadingPointsAction(false)));
};

export const refreshMembershipCardBalanceAction = () => {
  return (dispatch, getState) => {
    const { currentMembershipCard, currentMembershipCardPin } = getState().membershipCardReducer;

    dispatch(setMembershipCardIsLoading(true));

    return membershipCardService
      .getMembershipCardBalance(currentMembershipCard.id, {
        encryptedPin: currentMembershipCardPin,
        cardNumber: currentMembershipCard.cardNumber,
      })
      .then(() => {
        dispatch(getMembershipCardPointsAction());
      })
      .finally(() => dispatch(setMembershipCardIsLoading(false)));
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
    dispatch(setMembershipCardIsLoading(true));

    const _createNewCard = (encryptedPin) =>
      membershipCardService.createMembershipCard({ encryptedPin, cardNumber: formData.cardNumber });
    const _storeNewlyCreatedMembershipCard = (newCard) =>
      dispatch(appendMembershipCardAction(newCard));

    return Promise.resolve(formData.pin)
      .then(encryptionService.encryptPin)
      .then(_createNewCard)
      .then(_storeNewlyCreatedMembershipCard)
      .finally(() => dispatch(setMembershipCardIsLoading(false)));
  };
};

export const deleteMembershipCardAction = (id) => {
  return (dispatch) => {
    return membershipCardService.deleteMembershipCard(id).then(() => {
      dispatch(removeMembershipCardAction(id));
    });
  };
};

export const rememberCardPin = (pin) => {
  return (dispatch, getState) => {
    const membershipCardReducer = _.get(getState(), 'membershipCardReducer', {});
    const membershipCards = _.get(membershipCardReducer, 'membershipCards', {});
    const membershipCardPins = _.get(membershipCardReducer, 'membershipCardPins', {});
    const currentCardId = _.get(membershipCardReducer, 'currentMembershipCard.id', 0);

    membershipCards.forEach((card, index) => {
      if (_.get(card, 'id') === currentCardId) {
        membershipCardPins[index] = {
          card_id: currentCardId,
          card_pin: pin,
        };
      }
    });

    dispatch(setMembershipCardPinsAction(membershipCardPins));
  };
};
