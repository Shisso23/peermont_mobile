import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';
import { LoadingComponent } from '../../../../../components/molecules';
import { useBackButtonLoader } from '../../../../../hooks';
import { getLastPaymentUriAction } from '../../../../../reducers/payments-reducer/payments.actions';
import config from '../../../../../config';

const TopUpCompleteScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { paymentUri } = useSelector((reducers) => reducers.paymentReducer);

  useBackButtonLoader(() => {
    navigation.pop(2);
  });

  const setDeeplink = async () => {
    await AsyncStorage.setItem(config.deeplinkTransition, 'true');
  };

  useEffect(() => {
    setDeeplink();
    dispatch(getLastPaymentUriAction());
  }, []);

  return (
    <WebView
      startInLoadingState
      renderLoading={() => <LoadingComponent />}
      source={{ uri: paymentUri }}
    />
  );
};

TopUpCompleteScreen.propTypes = {};

TopUpCompleteScreen.defaultProps = {};

export default TopUpCompleteScreen;
