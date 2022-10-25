import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

export const handleNotificationOpenedBackGround = () => {
  const navigation = useNavigation();

  return () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (!_.isEmpty(remoteMessage)) {
        navigation.navigate('Notifications');
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (!_.isEmpty(remoteMessage)) {
          navigation.navigate('Notifications');
        }
      });
  };
};
