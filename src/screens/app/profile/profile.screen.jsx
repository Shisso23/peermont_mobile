import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';

import { infoPopUpService } from '../../../services';
import { UpdateProfile } from '../../../components/molecules';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { CountrySelect } from '../../../components/atoms';
import { LoadingComponent } from '../../../components';
import { useRefreshHeaderButton } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((reducers) => reducers.userReducer);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const route = useRoute();
  const updateMobileNumber = _.get(route, 'params.updateMobileNumber');

  const initialValues = _.pick(user, [
    'mobileNumber',
    'email',
    'proofOfId',
    'proofOfAddress',
    'callingCode',
    'country',
    'pendingEmail',
  ]);

  const _closeModal = (close) => {
    setShowOtpModal(close);
  };

  const _openModal = () => {
    setShowOtpModal(true);
  };

  useEffect(() => {
    dispatch(getUserAction());
    setShowOtpModal(false);
    if (updateMobileNumber) {
      setShowOtpModal(true);
    }
  }, []);

  useRefreshHeaderButton(() => {
    dispatch(getUserAction());
  }, loading);

  return !loading ? (
    <KeyboardScrollContainer>
      <Text style={custom.centerTitle}>My Profile</Text>
      <PaddedContainer>
        <Input
          style={styles.addPadding}
          value={!_.isEmpty(initialValues.email) ? initialValues.email : initialValues.pendingEmail}
          label="Email"
          editable={false}
          leftIcon={() => <Icon name="email" size={30} color="black" />}
          rightIcon={() => (
            <Icon
              name="info"
              size={20}
              onPress={() => {
                infoPopUpService.show(
                  'This is your email linked to your account. To change, click update profile.',
                );
              }}
            />
          )}
        />
        {!_.isEmpty(initialValues.pendingEmail) && (
          <View style={custom.profileStatusContainer}>
            <Text style={custom.profileStatus}>
              {initialValues.pendingEmail} pending verification
            </Text>
          </View>
        )}
        <Input
          value={initialValues.mobileNumber}
          label="Mobile Number"
          editable={false}
          leftIcon={() => <CountrySelect initialCountry={initialValues.country} />}
          rightIcon={() => (
            <Icon
              name="info"
              size={20}
              onPress={() => {
                infoPopUpService.show(
                  'This is your mobile number linked to your account. To change, click update profile.',
                );
              }}
            />
          )}
        />
        <Button title="Update Profile" onPress={_openModal} />
      </PaddedContainer>
      <UpdateProfile
        visible={showOtpModal}
        setModalVisible={_closeModal}
        updateMobileNumberFlow={updateMobileNumber}
      />
    </KeyboardScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

const styles = StyleSheet.create({
  addPadding: {
    paddingLeft: 10,
  },
});

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
