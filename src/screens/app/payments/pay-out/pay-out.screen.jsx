import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { PayOutForm } from '../../../../components/forms';
import { payOutModel } from '../../../../models';
import { performPayoutAction } from '../../../../reducers/payments-reducer/payments.actions';
import { FormPageContainer } from '../../../../components/containers';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const PayOutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading } = useSelector((reducer) => reducer.paymentReducer);

  const _handleSubmission = (formData) => {
    return dispatch(performPayoutAction(formData));
  };

  const _handleSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'PayOutComplete',
    });
  };

  useDisableBackButtonWhileLoading(isLoading);

  return (
    <FormPageContainer>
      <Text h4>Pay Out</Text>
      <Text>Balance: {_.get(route, 'params.balance')}</Text>
      <Text>Payouts may take 48 hours to process, not including weekends and public holidays</Text>
      <PayOutForm
        initialValues={payOutModel()}
        submitForm={_handleSubmission}
        onSuccess={_handleSuccess}
      />
    </FormPageContainer>
  );
};

PayOutScreen.propTypes = {};

PayOutScreen.defaultProps = {};

export default PayOutScreen;
