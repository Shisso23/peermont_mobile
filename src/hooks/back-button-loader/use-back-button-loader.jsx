import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { globalScreenOptions } from '../../../theme/theme.styles';
import { BackHeader } from '../../components/headers';

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
          <ActivityIndicator
            animating
            size="small"
            color={globalScreenOptions.headerTintColor}
            style={styles.loader}
          />
        ) : (
          <BackHeader onPress={onBack} tintColor={globalScreenOptions.headerTintColor} />
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
