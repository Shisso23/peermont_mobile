import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import membershipCardReducer from './membership-card-reducer/membership-card.reducer';
import creditCardReducer from './credit-card-reducer/credit-card.reducer';
import bankAccountReducer from './bank-account-reducer/bank-account.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  membershipCardReducer,
  creditCardReducer,
  bankAccountReducer,
});
