import _ from 'lodash';

import {
  setCreditCardsAction,
  setLoadingAction,
  removeCreditCardAction,
  setPrivateKeyAction,
} from './credit-card.reducer';
import { creditCardService, encryptionService } from '../../services';
import { publicKeyToPem } from '../../services/sub-services/encryption-service/encryption.utils';
import { decryptCallpayCredentials } from '../../helpers/credit-card.helper';

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
  return (dispatch, getState) => {
    dispatch(setLoadingAction(true));

    return dispatch(getCallpayCredentials())
      .then((encryptedCredentials) => {
        const { privateKey } = getState().creditCardReducer;
        const basicAuth = decryptCallpayCredentials(encryptedCredentials, privateKey);

        const { merchantReference } = encryptedCredentials;
        const callpayFormData = { ...formData, merchantReference };

        return creditCardService
          .createTokenizedCreditCard(callpayFormData, basicAuth)
          .then((callpayResponse) => {
            const creditCardFormData = {
              ...callpayFormData,
              ...callpayResponse,
            };

            return creditCardService.createCreditCard(creditCardFormData);
          });
      })
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

export const getCallpayCredentials = () => {
  return (dispatch) => {
    return encryptionService.getRsaKeyPair().then((keyPair) => {
      dispatch(setPrivateKeyAction(_.get(keyPair, 'privateKey')));
      const publicKey = _.get(keyPair, 'publicKey');
      const formData = {
        publicPem: publicKeyToPem(publicKey),
      };
      return creditCardService.getCallpayCredentials(formData);
    });
  };
};
