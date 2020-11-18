import React from 'react';
import { View } from 'react-native';
import { userAuthService } from '../../../services';
import { UserInfoForm } from '../../../components/forms';
import { registrationUserModel } from '../../../models';

const RegisterScreen = () => {
  const _onFormSuccess = () => {};
  return (
    <View>
      <UserInfoForm
        submitForm={userAuthService.register}
        onSuccess={_onFormSuccess}
        initialValues={registrationUserModel()}
      />
    </View>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
