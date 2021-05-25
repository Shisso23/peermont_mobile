import React, { useEffect } from 'react';
import { StatusBar, LogBox, Platform, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';
import codePush from 'react-native-code-push';

import colors from '../theme/theme.colors';
import NavigationContainer from './navigation/root.navigator';
import { firebaseService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import { hasIncomingNotification } from './reducers/notification-reducer/notification.actions';
import { signOutAction } from './reducers/user-auth-reducer/user-auth.actions';
import { loadAppDataAction } from './reducers/app-reducer/app.actions';
import { AutoSignOut } from './components/atoms';
import { useBiometricLogin, useAuthentication } from './hooks';
import config from './config';

const App = () => {
  const dispatch = useDispatch();
  const biometricLogin = useBiometricLogin();
  const { authenticate } = useAuthentication();

  const _continueToApp = () => {
    dispatch(setIsAuthenticatedAction(true));
  };

  const _handleAuthFinally = () => {
    if (Platform.OS === 'android') {
      RNBootSplash.hide({ fade: true });
    }
  };

  const _loadAuthData = () => {
    return authenticate(_continueToApp, _handleAuthFinally);
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

  const loadAppCenter = () => {
    const deploymentKey =
      Platform.OS === 'ios'
        ? config.appEnvironment === 'production'
          ? config.appCenterIos
          : config.appCenterIosStaging
        : config.appEnvironment === 'production'
        ? config.appCenterAndroid
        : config.appCenterAndroidStaging;

    codePush
      .sync(
        {
          deploymentKey,
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        (status) => {
          switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
              Alert.alert('Downloading new update');
              break;
            default:
              break;
          }
        },
      )
      .then();
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: ', 'Usage of ']);
    loadAppCenter();
    messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        checkPermission().then(() => {
          createNotificationListeners().then(() => {
            messaging().setBackgroundMessageHandler((remoteMessage) => {
              firebaseService.processMessage(remoteMessage).then();
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
