import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import membershipCardReducer from './membership-card-reducer/membership-card.reducer';
import creditCardReducer from './credit-card-reducer/credit-card.reducer';
import bankAccountReducer from './bank-account-reducer/bank-account.reducer';
import formDataReducer from './form-data-reducer/form-data.reducer';
import healthSurveyReducer from './health-survey-reducer/health-survey.reducer';
import paymentReducer from './payments-reducer/payments.reducer';
import notificationReducer from './notification-reducer/notification.reducer';
import advertReducer from './advert-reducer/advert.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  membershipCardReducer,
  creditCardReducer,
  bankAccountReducer,
  formDataReducer,
  healthSurveyReducer,
  paymentReducer,
  notificationReducer,
  advertReducer,
});
