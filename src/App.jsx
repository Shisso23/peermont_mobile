import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { userAuthService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import { getUserAction } from './reducers/user-reducer/user.actions';

const App = () => {
  const dispatch = useDispatch();
  const _getUserIfTokenExists = () => {
    userAuthService.doTokensExistInLocalStorage().then((tokensExist) => {
      if (tokensExist) {
        const userPromise = dispatch(getUserAction());
        userPromise.then(() => {
          dispatch(setIsAuthenticatedAction(true));
          // hide splash screen here
        });
      }
    });
  };

  useEffect(_getUserIfTokenExists, []);

  return <NavigationContainer />;
};

export default App;
