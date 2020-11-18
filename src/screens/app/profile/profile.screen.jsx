import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { UserInfoForm } from '../../../components/forms';
import { userModel } from '../../../models';
import { userService } from '../../../services';

const ProfileScreen = () => {
  const { user } = useSelector((reducers) => reducers.userReducer);
  const navigation = useNavigation();
  const _onFormSuccess = () => {};
  return (
    <View>
      <UserInfoForm
        edit
        submitForm={userService.updateUser}
        onSuccess={_onFormSuccess}
        initialValues={userModel(user)}
      />
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
