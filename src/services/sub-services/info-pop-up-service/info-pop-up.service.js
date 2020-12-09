import { Alert } from 'react-native';

const show = (message = '') => {
  Alert.alert('', message);
};

export default {
  show,
};
