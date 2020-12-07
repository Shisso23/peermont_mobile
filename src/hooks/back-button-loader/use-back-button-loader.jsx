import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';

const blockAndroidBackButton = () => true;
export const useBackButtonLoader = (functionToExecute) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const _initBlockNavigationListeners = () => {
    BackHandler.addEventListener('hardwareBackPress', blockAndroidBackButton);
    BackHandler.removeEventListener('hardwareBackPress', onBack);
  };

  const onBack = () => {
    setLoading(true);
    _initBlockNavigationListeners();
    return functionToExecute();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        isLoading ? (
          <ActivityIndicator animating size="small" color="black" style={styles.loader} />
        ) : (
          <HeaderBackButton onPress={onBack} />
        ),
    });
  }, [navigation, isLoading]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', blockAndroidBackButton);
    };
  }, []);

  return [isLoading];
};

const styles = StyleSheet.create({
  loader: { marginLeft: 12, marginTop: 2 },
});
