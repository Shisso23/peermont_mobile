import React, { useMemo } from 'react';
import WebView from 'react-native-webview';
import _ from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';

import { LoadingComponent } from '../../../../../components/molecules';
import { useBackButtonLoader } from '../../../../../hooks';
import paymentUrls from '../../../../../services/sub-services/payment-service/payment.urls';

const PaymentStatusScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const success = useMemo(() => _.get(route, 'params.success', false) === 'true', [route]);
  const paymentStatusUri = useMemo(() => {
    return success ? paymentUrls.paymentSuccess() : paymentUrls.paymentFailed();
  }, [success]);

  useBackButtonLoader(() => {
    navigation.navigate('App Home');
  });

  return (
    <WebView
      startInLoadingState
      renderLoading={() => <LoadingComponent />}
      source={{ uri: paymentStatusUri }}
    />
  );
};

PaymentStatusScreen.propTypes = {};

PaymentStatusScreen.defaultProps = {};

export default PaymentStatusScreen;
