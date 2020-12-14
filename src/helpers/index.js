import { BackHandler, Platform, Linking, Alert } from 'react-native';

export const exitAppOnHardwarePressListener = () => {
  BackHandler.addEventListener('hardwareBackPress', hardwareBackPressExitApp);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressExitApp);
  };
};
const hardwareBackPressExitApp = () => {
  Alert.alert(
    'You are about to exit the app',
    'You will be signed out. Would you like to continue?',
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: BackHandler.exitApp },
    ],
  );
  return true;
};

export const openUserPhoneApp = (phoneNumber) => {
  const number = Platform.select({
    android: `tel:${phoneNumber}`,
    ios: `telprompt:${phoneNumber}`,
  });
  Linking.openURL(number);
};
