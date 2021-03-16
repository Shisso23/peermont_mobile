import _ from 'lodash';

import { setUserAction, setLoadingAction } from './user.reducer';
import { firebaseService, userService } from '../../services';
import { setMembershipCardsAction } from '../membership-card-reducer/membership-card.reducer';
import { setCreditCardsAction } from '../credit-card-reducer/credit-card.reducer';
import { setBankAccountsAction } from '../bank-account-reducer/bank-account.reducer';

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

export const updateFirebaseToken = () => {
  return (_dispatch, getState) => {
    const { user } = getState().userReducer;
    return firebaseService.getAndSetToken().then((firebaseToken) => {
      const userId = _.get(user, 'id');
      return userService.updateFirebaseToken(userId, firebaseToken);
    });
  };
};
