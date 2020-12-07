import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PayOutForm } from '../../../../components/forms';
import { payOutModel } from '../../../../models';
import { performPayoutAction } from '../../../../reducers/payments-reducer/payments.actions';
import { FormPageContainer } from '../../../../components/containers';

const PayOutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _handleSubmission = (formData) => {
    return dispatch(performPayoutAction(formData));
  };

  const _handleSuccess = () => {
    navigation.replace('PaymentOtp', {
      afterOtpRoute: 'PayOutComplete',
    });
  };

  return (
    <FormPageContainer>
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
