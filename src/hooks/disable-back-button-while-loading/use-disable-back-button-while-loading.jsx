import React, { useLayoutEffect, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import { globalScreenOptions } from '../../../theme/theme.styles';

export const useDisableBackButtonWhileLoading = (isLoading, backPopAmount) => {
  const navigation = useNavigation();

  const _checkGoBack = (event) => {
    if (!isLoading) {
      navigation.dispatch(event.data.action);
    } else {
      event.preventDefault();
    }
  };

  const onBack = () => {
    navigation.pop(backPopAmount);
  };

  useLayoutEffect(() => {
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
          <HeaderBackButton onPress={onBack} tintColor={globalScreenOptions.headerTintColor} />
        ),
    });
  }, [isLoading]);

  useEffect(() => {
    navigation.removeListener('beforeRemove', _checkGoBack);
    navigation.addListener('beforeRemove', _checkGoBack);
  }, [isLoading]);
};

const styles = StyleSheet.create({
  loader: { marginLeft: 12, marginTop: 2 },
});

useDisableBackButtonWhileLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  backPopAmount: PropTypes.number,
};

useDisableBackButtonWhileLoading.defaultProps = {
  backPopAmount: 1,
};
