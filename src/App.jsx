import React, { useEffect } from 'react';
import { StatusBar, LogBox, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import colors from '../theme/theme.colors';
import NavigationContainer from './navigation/root.navigator';
import { firebaseService, userAuthService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import { hasIncomingNotification } from './reducers/notification-reducer/notification.actions';
import { signOutAction } from './reducers/user-auth-reducer/user-auth.actions';
import {
  loadAppDataAction,
  loadAppDataForSignedInUserAction,
} from './reducers/app-reducer/app.actions';
import { AutoSignOut } from './components/atoms';
import { useBiometricLogin } from './hooks';

const App = () => {
  const dispatch = useDispatch();
  const biometricLogin = useBiometricLogin();

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _loadAuthData = () => {
    return userAuthService
      .doTokensExistInLocalStorage()
      .then((tokensExist) => {
        if (tokensExist) {
          return dispatch(loadAppDataForSignedInUserAction()).then(_continueToApp);
        }
        return Promise.resolve();
      })
      .finally(() => {
        if (Platform.OS === 'android') {
          RNBootSplash.hide({ fade: true });
        }
      });
  };

  const _loadAppData = () => {
    dispatch(loadAppDataAction());
    if (!__DEV__) {
      biometricLogin().then(_loadAuthData);
    } else {
      _loadAuthData();
    }
  };

  const requestPermission = async () => {
    await messaging().requestPermission();
    await firebaseService.getAndSetToken();
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled === 1) {
      await firebaseService.getAndSetToken();
    } else {
      requestPermission();
    }
  };

  const createNotificationListeners = async () => {
    messaging().onMessage((remoteMessage) => {
      firebaseService.processMessage(remoteMessage);
      dispatch(hasIncomingNotification());
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: ']);
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
      })
      .finally(() => {
        if (!__DEV__) {
          dispatch(signOutAction()).then(_loadAppData);
        } else {
          _loadAppData();
        }
      });
  }, []);

  return (
    <>
      <AutoSignOut />
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer />
    </>
  );
};

export default App;
