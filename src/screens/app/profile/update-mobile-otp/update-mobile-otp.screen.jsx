import _ from 'lodash';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { NumericalInputForm } from '../../../../components/forms';
import {
  verifyUpdateMobileOtpAction,
  resendUpdateMobileOtpAction,
  verifyUpdateEmailOtpAction,
  getUserAction,
} from '../../../../reducers/user-reducer/user.actions';
import { updateSignInMobileNumberAction } from '../../../../reducers/user-auth-reducer/user-auth.actions';
import { otpModel } from '../../../../models';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { LoadingComponent } from '../../../../components';
import { custom } from '../../../../../theme/theme.styles';

const UpdateMobileOtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((reducer) => reducer.userReducer);
  const { params } = useRoute();

  const unconfirmedMobileNumber = _.get(params, 'unconfirmedMobileNumberFromQuery');
  const unconfirmedEmail = _.get(params, 'unconfirmedEmail');

  const _handleFormSubmission = (formData) => {
    if (!_.isNull(unconfirmedEmail)) {
      return dispatch(verifyUpdateEmailOtpAction(formData));
    }
    return dispatch(verifyUpdateMobileOtpAction(formData));
  };

  const _handleResendOtp = () => {
    dispatch(resendUpdateMobileOtpAction());
  };

  const _handleFormSuccess = () => {
    dispatch(getUserAction()).then(
      dispatch(updateSignInMobileNumberAction(unconfirmedMobileNumber)).then(
        navigation.navigate('MyProfile'),
      ),
    );
  };

  return !loading ? (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>One Time Pin</Text>
        <Text style={custom.centerSubtitle}>
          To proceed, Enter your One Time Pin to confirm your mobile number change. We have sent a
          SMS with a One Time Pin(OTP) to your new mobile number for validation.
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
        <TouchableOpacity onPress={_handleResendOtp}>
          <Text style={custom.resendOtpStyle}>Resend OTP</Text>
        </TouchableOpacity>
      </PaddedContainer>
    </KeyboardScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

export default UpdateMobileOtpScreen;
