import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NumericalInputForm } from '../../../components/forms';
import { FormPageContainer } from '../../../components/containers';
import { getMembershipCardBalanceAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { membershipCardPinModel } from '../../../models';

const MembershipCardPinScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);
  const _handleFormSubmission = (formData) => {
    return dispatch(getMembershipCardBalanceAction(formData));
  };

  const _handleFormSuccess = () => {
    navigation.replace('MembershipCardDetail');
  };

  return (
    <FormPageContainer>
      <Text>Please enter membership card pin for: {currentMembershipCard.cardNumber}</Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={membershipCardPinModel()}
        onSuccess={_handleFormSuccess}
      />
    </FormPageContainer>
  );
};

export default MembershipCardPinScreen;
