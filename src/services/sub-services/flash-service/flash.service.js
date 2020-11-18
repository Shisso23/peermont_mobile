import Toast from 'react-native-toast-message';

const success = (message = '') => {
  Toast.show({ text1: 'Success', text2: message, type: 'success' });
};

const error = (message) => {
  Toast.show({ text1: 'Error', text2: message, type: 'error' });
};

const info = (message) => {
  Toast.show({ text1: 'Info', text2: message, type: 'info' });
};

export default {
  success,
  error,
  info,
};
