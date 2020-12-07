import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';
import { LoadingComponent } from '../../../../../components/molecules';
import { useBackButtonLoader } from '../../../../../hooks';
import { getLastPaymentUriAction } from '../../../../../reducers/payments-reducer/payments.actions';
import { reloadCurrentMembershipCardBalanceAction } from '../../../../../reducers/membership-card-reducer/membership-card.actions';

const TopUpCompleteScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { paymentUri } = useSelector((reducers) => reducers.paymentReducer);

  useBackButtonLoader(() => {
    dispatch(reloadCurrentMembershipCardBalanceAction()).then(() => {
      navigation.pop();
    });
  });

  useEffect(() => {
    dispatch(getLastPaymentUriAction());
  }, []);

  return (
    <WebView startInLoadingState renderLoading={LoadingComponent} source={{ uri: paymentUri }} />
  );
};

TopUpCompleteScreen.propTypes = {};

TopUpCompleteScreen.defaultProps = {};

export default TopUpCompleteScreen;
