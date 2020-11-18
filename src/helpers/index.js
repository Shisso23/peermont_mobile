import { BackHandler } from 'react-native';

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
