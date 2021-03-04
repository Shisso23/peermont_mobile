import React, { useLayoutEffect, useEffect } from 'react';
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
      headerLeft: () => (
        <HeaderBackButton
          onPress={onBack}
          tintColor={globalScreenOptions.headerTintColor}
          disabled={isLoading}
        />
      ),
    });
  }, [isLoading]);

  useEffect(() => {
    navigation.removeListener('beforeRemove', _checkGoBack);
    navigation.addListener('beforeRemove', _checkGoBack);
  }, [isLoading]);
};

useDisableBackButtonWhileLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  backPopAmount: PropTypes.number,
};

useDisableBackButtonWhileLoading.defaultProps = {
  backPopAmount: 1,
};
