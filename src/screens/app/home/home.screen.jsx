import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { exitAppOnHardwarePressListener } from '../../../helpers';

const { CancelToken } = axios;

const HomeScreen = () => {
  const requestSource = CancelToken.source();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  }, []);

  return (
    <ScrollView>
      <Text> Welcome {user.firstName}</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </ScrollView>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
