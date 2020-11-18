import React from 'react';
import { View } from 'react-native';
import { ForgotPasswordForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { forgotPasswordModel } from '../../../models';

const ForgotPasswordScreen = () => {
  return (
    <View>
      <ForgotPasswordForm
        submitForm={userAuthService.forgotPassword}
        initialValues={forgotPasswordModel()}
      />
    </View>
  );
};

ForgotPasswordScreen.propTypes = {};
ForgotPasswordScreen.defaultProps = {};

export default ForgotPasswordScreen;
