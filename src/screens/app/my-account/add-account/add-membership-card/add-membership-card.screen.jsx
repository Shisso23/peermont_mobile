import React from 'react';
import { Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../../components/containers';
import { MembershipCardForm } from '../../../../../components/forms';
import { membershipCardModel } from '../../../../../models';
import { createMembershipCardAction } from '../../../../../reducers/membership-card-reducer/membership-card.actions';
import { useDisableBackButtonWhileLoading } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';

const AddMembershipCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading } = useSelector((reducer) => reducer.membershipCardReducer);

  const _handleSubmission = (formData) => {
    return dispatch(createMembershipCardAction(formData));
  };

  const _handleSuccess = () => {
    navigation.pop();
  };

  useDisableBackButtonWhileLoading(isLoading, 2);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Add Card</Text>
        <Text style={custom.centerSubtitle}>
          Enter your Winners Circle Card details. You will receive a SMS with a One Time Pin(OTP) on
          your mobile number for validation.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <MembershipCardForm
          initialValues={membershipCardModel()}
          submitForm={_handleSubmission}
          onSuccess={_handleSuccess}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

AddMembershipCardScreen.propTypes = {};

AddMembershipCardScreen.defaultProps = {};

export default AddMembershipCardScreen;
