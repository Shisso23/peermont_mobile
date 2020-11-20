import { Alert } from 'react-native';

export const promptConfirmDelete = (message, onConfirm) => {
  Alert.alert(
    'Are you sure?',
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onConfirm,
      },
    ],
    { cancelable: false },
  );
};
