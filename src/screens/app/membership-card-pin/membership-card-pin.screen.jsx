import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { NumericalInputForm } from '../../../components/forms';
import { FormPageContainer } from '../../../components/containers';
import {
  getMembershipCardBalanceAction,
  rememberCardPin,
} from '../../../reducers/membership-card-reducer/membership-card.actions';
import { membershipCardPinModel } from '../../../models';
import HealthSurveyScreen from '../health-survey/health-survey.screen';
import { useDisableBackButtonWhileLoading } from '../../../hooks';

const MembershipCardPinScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef(null);
  const { currentMembershipCard, isLoading } = useSelector(
    (reducers) => reducers.membershipCardReducer,
  );

  const _handleFormSubmission = (formData) => {
    return dispatch(getMembershipCardBalanceAction(formData)).then(() => {});
  };

  const _handleFormSuccess = (formData) => {
    const pin = _.get(formData, 'numeric');
    dispatch(rememberCardPin(pin));
    navigation.replace('MembershipCardDetail');
  };

  const { cardPin = '' } = route.params;
  const initialValues = membershipCardPinModel({ card_pin: cardPin });

  useDisableBackButtonWhileLoading(isLoading);

  useEffect(() => {
    const { current } = formRef;
    if (!_.isNull(current) && cardPin.length === 4) {
      current.handleSubmit();
    }
  }, [cardPin]);

  return (
    <FormPageContainer>
      <Text h4>Insert Winners Circle Pin</Text>
      <Text>
        Please enter your 4 digit membership card pin for: {currentMembershipCard.cardNumber}
      </Text>
      <NumericalInputForm
        submitForm={_handleFormSubmission}
        initialValues={initialValues}
        onSuccess={_handleFormSuccess}
        ref={formRef}
      />
    </FormPageContainer>
  );
};

HealthSurveyScreen.propTypes = {};

HealthSurveyScreen.defaultProps = {};

export default MembershipCardPinScreen;
