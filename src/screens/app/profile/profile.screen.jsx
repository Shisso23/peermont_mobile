import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { ProfileForm } from '../../../components/forms';
import { KeyboardScrollContainer, PaddedContainer } from '../../../components/containers';
import {
  getUserAction,
  userUpdateProfileAction,
} from '../../../reducers/user-reducer/user.actions';
import { AddButton, LoadingComponent, ProfileDocument } from '../../../components';
import { useRefreshHeaderButton } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, loading } = useSelector((reducers) => reducers.userReducer);
  const initialValues = _.pick(user, [
    'mobileNumber',
    'email',
    'proofOfId',
    'proofOfAddress',
    'callingCode',
    'country',
  ]);

  const _handleSubmission = (formData) => {
    return dispatch(userUpdateProfileAction(formData));
  };

  const _handleFormSuccess = (data) => {
    const unconfirmedMobileNumber = _.get(data, 'unconfirmed_mobile_number', null);

    if (!_.isNull(unconfirmedMobileNumber)) {
      navigation.navigate('UpdateMobileOtp', { unconfirmedMobileNumber });
    }
  };

  const _handleUploadProfileDocument = () => navigation.navigate('UploadProfileDocument');

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  useRefreshHeaderButton(() => {
    dispatch(getUserAction());
  }, loading);

  const renderUserDocuments = () => {
    const documents = [];

    if (_.get(user, 'proofOfId')) {
      documents.push(
        <ProfileDocument
          key="poid"
          name="Proof of ID"
          status={_.get(user, 'proofOfIdStatus')}
          disabled
        />,
      );
    }
    if (_.get(user, 'proofOfAddress')) {
      documents.push(
        <ProfileDocument
          key="poa"
          name="Proof of Address"
          status={_.get(user, 'proofOfAddressStatus')}
          disabled
        />,
      );
    }

    return documents;
  };

  const RenderDocuments = () => {
    return _.isEmpty(renderUserDocuments()) ? (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Document upload</ListItem.Title>
          <ListItem.Subtitle>
            Click the plus button above to add your profile documents.
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ) : (
      renderUserDocuments()
    );
  };

  return !loading ? (
    <KeyboardScrollContainer>
      <Text style={custom.centerTitle}>My Profile</Text>
      <PaddedContainer>
        <ProfileForm
          submitForm={_handleSubmission}
          onSuccess={_handleFormSuccess}
          initialValues={initialValues}
        />
      </PaddedContainer>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Documents</Text>
          <AddButton onPress={_handleUploadProfileDocument} />
        </View>
        <RenderDocuments />
      </PaddedContainer>
    </KeyboardScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

const styles = StyleSheet.create({
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
