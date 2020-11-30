import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import NavigationContainer from './navigation/root.navigator';
import { userAuthService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import { getUserAction } from './reducers/user-reducer/user.actions';
import { loadAllFormDataAction } from './reducers/form-data-reducer/form-data.actions';
import colors from '../theme/theme.colors';

const App = () => {
  const dispatch = useDispatch();

  const _preLoadAllAppData = () => {
    return Promise.all([dispatch(getUserAction()), dispatch(loadAllFormDataAction())]);
  };

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _loadAppData = () => {
    userAuthService.doTokensExistInLocalStorage().then((tokensExist) => {
      if (tokensExist) {
        _preLoadAllAppData().then(_continueToApp);
      }
    });
  };

  useEffect(_loadAppData, []);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer />
    </>
  );
};

export default App;
