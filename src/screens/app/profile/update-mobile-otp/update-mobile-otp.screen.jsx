import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Text, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyUpdateMobileOtpAction,
  resendUpdateMobileOtpAction,
} from '../../../../reducers/user-reducer/user.actions';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { Modal } from '../../../../components';
import { custom } from '../../../../../theme/theme.styles';
import colors from '../../../../../theme/theme.colors';

const UpdateMobileOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { loading } = useSelector((reducer) => reducer.userReducer);

  const _handleFormSubmission = (formData) => {
    return dispatch(verifyUpdateMobileOtpAction(formData));
  };

  const _handleResendOtp = () => {
    dispatch(resendUpdateMobileOtpAction());
  };

  const _handleFormSuccess = () => {
    navigation.pop();
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          Enter your One Time Pin to confirm your mobile number change. We have sent a SMS with a
          One Time Pin(OTP) to your new mobile number for validation.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <NumericalInputForm
          submitForm={_handleFormSubmission}
          initialValues={otpModel()}
          onSuccess={_handleFormSuccess}
        />
      </PaddedContainer>
      <Divider />
      <PaddedContainer>
        <Button title="Resend OTP" onPress={_handleResendOtp} />
      </PaddedContainer>
      <Modal
        visible={loading}
        transparent
        backgroundFade
        backgroundFadeColor={colors.whiteTransparent}
      >
        <View>
          <ActivityIndicator animating size="large" color={colors.gold} />
        </View>
      </Modal>
    </KeyboardScrollContainer>
  );
};

export default UpdateMobileOtpScreen;
