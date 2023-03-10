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
  setTempCardInfoAction,
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
    dispatch(setTempCardInfoAction(formData));

    return Promise.resolve(clearTextPin)
      .then((pin) => encryptionService.encryptPin(_.get(currentMembershipCard, 'cardNumber'), pin))
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

export const checkForNumberChangeAction = () => {
  return (dispatch, getState) => {
    const { currentMembershipCard, tempCardInfo } = getState().membershipCardReducer;
    const clearTextPin = tempCardInfo.numeric;

    return Promise.resolve(clearTextPin)
      .then((pin) => encryptionService.encryptPin(_.get(currentMembershipCard, 'cardNumber'), pin))
      .then((encryptedPin) => {
        return membershipCardService
          .checkForNumberChange(currentMembershipCard.id, {
            encryptedPin,
            cardNumber: currentMembershipCard.cardNumber,
          })
          .then((numberChanged) => {
            return numberChanged;
          })
          .finally(() => dispatch(setTempCardInfoAction({})));
      });
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
      .then((pin) => encryptionService.encryptPin(_.get(formData, 'cardNumber'), pin))
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

export const forgetCardPin = () => {
  return (dispatch, getState) => {
    const membershipCardReducer = _.get(getState(), 'membershipCardReducer', {});
    const membershipCards = _.get(membershipCardReducer, 'membershipCards', {});
    const membershipCardPins = _.get(membershipCardReducer, 'membershipCardPins', {});
    const currentCardId = _.get(membershipCardReducer, 'currentMembershipCard.id', 0);

    membershipCards.forEach((card, index) => {
      if (_.get(card, 'id') === currentCardId) {
        membershipCardPins[index] = {
          card_id: currentCardId,
          card_pin: '',
        };
      }
    });

    dispatch(setMembershipCardPinsAction(membershipCardPins));
  };
};

export const queryPatronEnquiryAction = (formData) => {
  return (dispatch) => {
    dispatch(setMembershipCardIsLoading(true));

    const _instanciateCard = (encryptedPin) =>
      membershipCardService.queryPatronEnquiry({
        encryptedPin,
        cardNumber: formData.cardNumber,
        unconfirmedMobileNumberForQuery: formData.unconfirmedMobileNumberForQuery,
      });

    return Promise.resolve(formData.pin)
      .then((pin) => encryptionService.encryptPin(_.get(formData, 'cardNumber'), pin))
      .then(_instanciateCard)
      .finally(() => dispatch(setMembershipCardIsLoading(false)));
  };
};
