import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { FormPageContainer } from '../../../../../components/containers';
import { MembershipCardForm } from '../../../../../components/forms';
import { membershipCardModel } from '../../../../../models';
import { createMembershipCardAction } from '../../../../../reducers/membership-card-reducer/membership-card.actions';

const AddMembershipCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleSubmission = (formData) => {
    return dispatch(createMembershipCardAction(formData));
  };

  const _handleSuccess = () => {
    navigation.pop();
  };

  return (
    <FormPageContainer>
      <Text h4>Add Card</Text>
      <Text>Provide your Winner Circle card details</Text>
      <MembershipCardForm
        initialValues={membershipCardModel()}
        submitForm={_handleSubmission}
        onSuccess={_handleSuccess}
      />
    </FormPageContainer>
  );
};

AddMembershipCardScreen.propTypes = {};

AddMembershipCardScreen.defaultProps = {};

export default AddMembershipCardScreen;
