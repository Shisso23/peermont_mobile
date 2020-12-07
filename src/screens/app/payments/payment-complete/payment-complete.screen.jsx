import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import { getLastPaymentUriAction } from '../../../../reducers/payments-reducer/payments.actions';
import { LoadingComponent } from '../../../../components/molecules';
import { reloadCurrentMembershipCardBalanceAction } from '../../../../reducers/membership-card-reducer/membership-card.actions';

const blockAndroidBackButton = () => true;

const PaymentCompleteScreen = () => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { paymentUri } = useSelector((reducers) => reducers.paymentReducer);

  const _initBlockNavigationListeners = () => {
    BackHandler.addEventListener('hardwareBackPress', blockAndroidBackButton);
    BackHandler.removeEventListener('hardwareBackPress', _reloadMembershipCard);
  };

  const _reloadMembershipCard = () => {
    setLoading(true);
    _initBlockNavigationListeners();
    dispatch(reloadCurrentMembershipCardBalanceAction()).then(() => {
      navigation.pop();
    });
    return true;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        isLoading ? (
          <ActivityIndicator animating size="small" color="black" style={styles.loader} />
        ) : (
          <HeaderBackButton onPress={_reloadMembershipCard} />
        ),
    });
  }, [navigation, isLoading]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _reloadMembershipCard);
    dispatch(getLastPaymentUriAction());
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', blockAndroidBackButton);
    };
  }, []);

  return (
    <WebView startInLoadingState renderLoading={LoadingComponent} source={{ uri: paymentUri }} />
  );
};

const styles = StyleSheet.create({
  loader: { marginLeft: 12, marginTop: 2 },
});

PaymentCompleteScreen.propTypes = {};

PaymentCompleteScreen.defaultProps = {};

export default PaymentCompleteScreen;
