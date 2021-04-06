import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProfileForm } from '../../../components/forms';
import { ScrollContainer } from '../../../components/containers';
import { userUpdateProfileAction } from '../../../reducers/user-reducer/user.actions';
import { flashService } from '../../../services';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { signInFormData } = useSelector((reducers) => reducers.userAuthReducer);

  const _handleSubmission = (formData) => {
    return dispatch(userUpdateProfileAction(formData));
  };

  const _handleFormSuccess = () => {
    flashService.inbox('Profile Updated', 'Profile details successfully updated');
  };

  return (
    <ScrollContainer>
      <ProfileForm
        submitForm={_handleSubmission}
        onSuccess={_handleFormSuccess}
        initialValues={user}
        mobileValues={signInFormData}
      />
    </ScrollContainer>
  );
};

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;
