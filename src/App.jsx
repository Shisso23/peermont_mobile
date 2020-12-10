import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import NavigationContainer from './navigation/root.navigator';
import { userAuthService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import colors from '../theme/theme.colors';
import {
  loadAppDataAction,
  loadAppDataForSignedInUserAction,
} from './reducers/app-reducer/app.actions';
import AutoSignOut from './components/atoms/auto-sign-out';

const App = () => {
  const dispatch = useDispatch();

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _loadAppData = () => {
    dispatch(loadAppDataAction());
    userAuthService.doTokensExistInLocalStorage().then((tokensExist) => {
      if (tokensExist) {
        dispatch(loadAppDataForSignedInUserAction()).then(_continueToApp);
      }
    });
  };

  useEffect(_loadAppData, []);

  return (
    <>
      <AutoSignOut />
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer />
    </>
  );
};

export default App;
