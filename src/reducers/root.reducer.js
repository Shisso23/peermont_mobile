import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
});
