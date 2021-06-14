import { BackHandler, Platform, Linking, Alert } from 'react-native';
import _ from 'lodash';

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
  Linking.openURL(number).then();
};

export const openEmailApp = (emailAddress) => {
  const email = `mailto:${emailAddress}`;
  Linking.openURL(email).then();
};

export const limitFileName = (name, type, limit = 16) => {
  const nameLength = name.length;

  if (nameLength <= limit) {
    return name;
  }

  const halfNameLength = nameLength / 2;
  const neededSpace = 4;

  const firstHalf = name.substring(0, halfNameLength);
  const secondHalf = name.substring(halfNameLength);
  const fileType = _.nth(_.split(type, '/', 2), 1);

  const halfRemainingLength = (limit - (fileType.length + neededSpace)) / 2;

  const truncatedFirst = _.truncate(firstHalf, { length: halfRemainingLength, omission: '' });
  const truncatedSecond = _.truncate(secondHalf, { length: halfRemainingLength, omission: '' });

  return `${truncatedFirst}...${truncatedSecond}.${fileType}`;
};
