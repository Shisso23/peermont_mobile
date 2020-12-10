import { getUserAction } from '../user-reducer/user.actions';
import { loadAllFormDataAction } from '../form-data-reducer/form-data.actions';
import { loadSignInFormFromStorage } from '../user-auth-reducer/user-auth.actions';

export const loadAppDataAction = () => {
  return (dispatch) => {
    return Promise.all([dispatch(loadSignInFormFromStorage())]);
  };
};

export const loadAppDataForSignedInUserAction = () => {
  return (dispatch) => {
    return Promise.all([
      dispatch(getUserAction()),
      dispatch(loadAllFormDataAction()),
      dispatch(loadSignInFormFromStorage()),
    ]);
  };
};
