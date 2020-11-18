import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const { CancelToken } = axios;

const HomeScreen = () => {
  const requestSource = CancelToken.source();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(exitAppOnHardwarePressListener, []);

  const _signOut = () => {
    dispatch(signOutAction());
  };

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  }, []);

  return (
    <View>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Sign Out" onPress={_signOut} />
    </View>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
