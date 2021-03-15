import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { useDispatch } from 'react-redux';
import { StatusBar, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NavigationContainer from './navigation/root.navigator';
import { firebaseService, userAuthService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import colors from '../theme/theme.colors';
import {
  loadAppDataAction,
  loadAppDataForSignedInUserAction,
} from './reducers/app-reducer/app.actions';
import AutoSignOut from './components/atoms/auto-sign-out';
import { signOutAction } from './reducers/user-auth-reducer/user-auth.actions';

const App = () => {
  const dispatch = useDispatch();

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _loadAppData = () => {
    dispatch(loadAppDataAction());
    userAuthService
      .doTokensExistInLocalStorage()
      .then((tokensExist) => {
        if (tokensExist) {
          return dispatch(loadAppDataForSignedInUserAction()).then(_continueToApp);
        }
        return Promise.resolve();
      })
      .finally(() => {
        RNBootSplash.hide({ fade: true });
      });
  };

  useEffect(() => {
    if (!__DEV__) {
      dispatch(signOutAction()).then(_loadAppData);
    } else {
      _loadAppData();
    }
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: ']);
  }, []);

  useEffect(() => {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        checkPermission().then(() => {
          createNotificationListeners().then(() => {
            messaging().setBackgroundMessageHandler((remoteMessage) => {
              firebaseService.processMessage(remoteMessage);
            });
          });
        });
      });
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled === 1) {
      await firebaseService.getAndSetToken();
    } else {
      requestPermission().then();
    }
  };

  const requestPermission = async () => {
    await messaging().requestPermission();
    await firebaseService.getAndSetToken();
  };

  const createNotificationListeners = async () => {
    messaging().onMessage((remoteMessage) => {
      firebaseService.processMessage(remoteMessage);
    });
  };

  return (
    <>
      <AutoSignOut />
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer />
    </>
  );
};

export default App;
