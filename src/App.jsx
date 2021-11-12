import React, { useEffect, useState } from 'react';
import { StatusBar, LogBox, Platform, ImageBackground, StyleSheet, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { useDispatch } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { HmsPushEvent } from '@hmscore/react-native-hms-push';

import colors from '../theme/theme.colors';
import NavigationContainer from './navigation/root.navigator';
import { firebaseService, pushKitService } from './services';
import { setIsAuthenticatedAction } from './reducers/user-auth-reducer/user-auth.reducer';
import { hasIncomingNotification } from './reducers/notification-reducer/notification.actions';
import { signOutAction } from './reducers/user-auth-reducer/user-auth.actions';
import { loadAppDataAction } from './reducers/app-reducer/app.actions';
import { AutoSignOut } from './components/atoms';
import { splashScreen } from './assets';
import { useBiometricLogin, useAuthentication } from './hooks';
import config from './config';

const App = () => {
  const dispatch = useDispatch();
  const biometricLogin = useBiometricLogin();
  const { authenticate } = useAuthentication();
  const [showCodePushDownload, setShowCodePushDownload] = useState(false);
  const [showCodePushStatus, setShowCodePushStatus] = useState('');

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
    DeviceInfo.hasHms().then(async (hasHms) => {
      if (hasHms) {
        await pushKitService.getAndSetToken();
      } else {
        messaging()
          .hasPermission()
          .then(async (enabled) => {
            if (enabled === 1) {
              await firebaseService.getAndSetToken();
            } else {
              requestPermission();
            }
          });
      }
    });
  };

  const createNotificationListeners = async () => {
    DeviceInfo.hasHms().then((hasHms) => {
      if (hasHms) {
        HmsPushEvent.onRemoteMessageReceived((remoteMessageHuawei) => {
          pushKitService.processMessage(remoteMessageHuawei.msg.data);
          dispatch(hasIncomingNotification());
        });
      } else {
        messaging().onMessage((remoteMessage) => {
          firebaseService.processMessage(remoteMessage);
          dispatch(hasIncomingNotification());
        });
      }
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

    codePush.sync({ deploymentKey, installMode: codePush.InstallMode.IMMEDIATE }, (status) => {
      switch (status) {
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          setShowCodePushStatus('Downloading update');
          setShowCodePushDownload(true);
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          setShowCodePushStatus('Installing update');
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          setShowCodePushDownload(false);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: ', 'Usage of ']);
    loadAppCenter();
    DeviceInfo.hasHms().then((hasHms) => {
      if (hasHms) {
        checkPermission()
          .then(() => {
            createNotificationListeners();
          })
          .finally(() => {
            _loadAppData();
          });
      } else {
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
      }
    });
  }, []);

  return showCodePushDownload ? (
    <ImageBackground
      resizeMode="contain"
      source={splashScreen}
      style={styles.backgroundImageSplashScreen}
    >
      <ProgressBar indeterminate style={styles.barProgressSplashScreen} color={colors.gold} />
      <Text style={styles.textProgressSplashScreen}>{showCodePushStatus}</Text>
    </ImageBackground>
  ) : (
    <>
      <AutoSignOut />
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundImageSplashScreen: {
    bottom: 5,
    flex: 1,
    margin: 35,
  },
  barProgressSplashScreen: {
    alignSelf: 'center',
    bottom: '20%',
    position: 'absolute',
    width: '60%',
  },
  textProgressSplashScreen: {
    alignSelf: 'center',
    bottom: '17%',
    position: 'absolute',
  },
});
