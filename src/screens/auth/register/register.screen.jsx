import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Divider, ListItem, Text } from 'react-native-elements';

import { MembershipCardForm } from '../../../components/forms';
import { registrationMembershipCardModel } from '../../../models';
import { registerAction } from '../../../reducers/user-auth-reducer/user-auth.actions';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { Contact } from '../../../components/atoms';
import { OtpNumericInput } from '../../../components/molecules';
import { custom } from '../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../hooks';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.userAuthReducer);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const _handleFormSubmit = (formData) => {
    return dispatch(registerAction({ formData }));
  };

  const _onFormSuccess = () => {
    setShowOtpModal(true);
  };

  const _closeModal = (close) => {
    setShowOtpModal(close);
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Register</Text>
        <Text style={custom.centerSubtitle}>
          Enter your Winners Circle Card details (The number on the front of your card). You will
          receive a SMS with a One Time Pin(OTP) on your mobile number for validation.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <MembershipCardForm
          submitForm={_handleFormSubmit}
          onSuccess={_onFormSuccess}
          initialValues={registrationMembershipCardModel()}
        />
      </PaddedContainer>
      <Text style={custom.centerSubtitle}>
        By clicking Next, you agree to our Terms and Conditions and our Privacy Policy.
      </Text>
      <Divider />
      <Divider />
      <ListItem onPress={() => navigation.navigate('TermsAndConditions')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Terms And Conditions</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate('PrivacyPolicy')} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>Privacy Policy</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Contact />
      <Divider />
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeModal}
        verificationType="REGISTER"
      />
    </KeyboardScrollContainer>
  );
};

RegisterScreen.propTypes = {};
RegisterScreen.defaultProps = {};

export default RegisterScreen;
