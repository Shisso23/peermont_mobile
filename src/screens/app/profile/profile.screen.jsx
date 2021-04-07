import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { ProfileForm } from '../../../components/forms';
import { KeyboardScrollContainer } from '../../../components/containers';
import { userUpdateProfileAction } from '../../../reducers/user-reducer/user.actions';
// import { flashService } from '../../../services';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((reducers) => reducers.userReducer);

  const _handleSubmission = (formData) => {
    return dispatch(userUpdateProfileAction(formData));
  };

  const _handleFormSuccess = (data) => {
    // flashService.inbox('Profile Updated', 'Profile details successfully updated');
    const unconfirmedMobileNumber = _.get(data, 'unconfirmed_mobile_number', null);

    if (!_.isNull(unconfirmedMobileNumber)) {
      navigation.navigate('UpdateMobileOtp');
    }
  };

  const initialValues = _.pick(user, [
    'mobileNumber',
    'email',
    'proofOfId',
    'proofOfAddress',
    'callingCode',
    'country',
  ]);

  return (
    <KeyboardScrollContainer>
      <ProfileForm
        submitForm={_handleSubmission}
        onSuccess={_handleFormSuccess}
        initialValues={initialValues}
      />
    </KeyboardScrollContainer>
  );
};

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
