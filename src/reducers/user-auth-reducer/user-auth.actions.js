import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from './user-auth.reducer';

export const signOutAction = () => {
  return (dispatch) => {
    userAuthService.signOut().then(() => {
      dispatch(setIsAuthenticatedAction(false));
    });
  };
};

export const registerAction = ({ formData }) => {
  return userAuthService.register({ formData }).then((res) => {
    // store token here
  });
};
