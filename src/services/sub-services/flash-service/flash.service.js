import Toast from 'react-native-toast-message';

const success = (message = '', visibilityTime = '4000') => {
  Toast.show({ text1: 'Success', text2: message, type: 'success', visibilityTime });
};

const error = (message, visibilityTime = '4000', autoHide = true) => {
  Toast.show({ text1: 'Error', text2: message, type: 'error', visibilityTime, autoHide });
};

const info = (message) => {
  Toast.show({ text1: 'Info', text2: message, type: 'info' });
};

const inbox = (title, message) => {
  Toast.show({ text1: title, text2: message, type: 'info' });
};

export default {
  success,
  error,
  info,
  inbox,
};
