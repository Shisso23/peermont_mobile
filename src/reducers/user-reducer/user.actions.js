import _ from 'lodash';

import { setUserAction, setLoadingAction } from './user.reducer';
import { firebaseService, userService } from '../../services';
import { setMembershipCardsAction } from '../membership-card-reducer/membership-card.reducer';
import { setCreditCardsAction } from '../credit-card-reducer/credit-card.reducer';
import { setBankAccountsAction } from '../bank-account-reducer/bank-account.reducer';
import { parseMobile } from '../../models/auth/auth-utils/auth.utils';

export const getUserAction = () => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return userService.getUser().then((_user) => {
      dispatch(setUserAction(_user));
      dispatch(setMembershipCardsAction(_user.membershipCards));
      dispatch(setCreditCardsAction(_user.creditCards));
      dispatch(setBankAccountsAction(_user.bankAccounts));
      dispatch(setLoadingAction(false));
    });
  };
};

export const userUpdateProfileAction = (formData) => {
  return (_dispute, getState) => {
    const { mobileNumber } = getState().userReducer.user;
    const unconfirmedMobileNumber = parseMobile(
      _.get(formData, 'mobileNumber'),
      _.get(formData, 'callingCode'),
    );

    formData = {
      mobileNumber: mobileNumber === unconfirmedMobileNumber ? null : unconfirmedMobileNumber,
      email: _.get(formData, 'email'),
    };

    return userService.updateUserProfile(formData);
  };
};

export const updateFirebaseToken = () => {
  return () => {
    return firebaseService.getAndSetToken().then((firebaseToken) => {
      return userService.updateUserProfile({ firebaseToken });
    });
  };
};

export const userUploadProfileDocumentsAction = (formData) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));

    return userService
      .uploadUserProfileDocuments(formData)
      .then(() => {
        dispatch(getUserAction());
      })
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const verifyUpdateMobileOtpAction = (formData) => {
  return (dispatch) => {
    dispatch(setLoadingAction(true));
    return userService
      .verifyUpdateMobileOtpAction(formData)
      .finally(() => dispatch(setLoadingAction(false)));
  };
};

export const resendUpdateMobileOtpAction = () => {
  return () => {
    return userService.resendUpdateMobileOtpAction();
  };
};
