import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { TopUpForm } from '../../../../components/forms';
import { FormPageContainer } from '../../../../components/containers';
import { initiateTopUpAction } from '../../../../reducers/payments-reducer/payments.actions';
import { topUpModel } from '../../../../models';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const TopUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector((reducer) => reducer.paymentReducer);

  const _handleFormSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'TopUpComplete',
    });
  };

  const _handleFormSubmit = (formData) => {
    return dispatch(initiateTopUpAction(formData));
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <FormPageContainer>
      <Text h4>Top Up</Text>
      <Text>Balance: {_.get(route, 'params.balance')}</Text>
      <TopUpForm
        initialValues={topUpModel()}
        onSuccess={_handleFormSuccess}
        submitForm={_handleFormSubmit}
      />
    </FormPageContainer>
  );
};

TopUpScreen.propTypes = {};

TopUpScreen.defaultProps = {};

export default TopUpScreen;
