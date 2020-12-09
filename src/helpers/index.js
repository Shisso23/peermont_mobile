import { BackHandler, Platform, Linking } from 'react-native';

export const exitAppOnHardwarePressListener = () => {
  BackHandler.addEventListener('hardwareBackPress', hardwareBackPressExitApp);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressExitApp);
  };
};
const hardwareBackPressExitApp = () => {
  // we can add a prompt here
  BackHandler.exitApp();
  return true;
};

export const openUserPhoneApp = (phoneNumber) => {
  const number = Platform.select({
    android: `tel:${phoneNumber}`,
    ios: `telprompt:${phoneNumber}`,
  });
  Linking.openURL(number);
};
