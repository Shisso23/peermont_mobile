import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { RefreshHeader } from '../../components/headers';

export const useRefreshHeaderButton = (refreshFunction, disableIfLoading) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RefreshHeader refreshFunction={refreshFunction} disabled={disableIfLoading} />
      ),
    });
  }, [disableIfLoading]);
};

useRefreshHeaderButton.propTypes = {
  refreshFunction: PropTypes.func.isRequired,
  disableIfLoading: PropTypes.bool,
};

useRefreshHeaderButton.defaultProps = {
  disableIfLoading: false,
};
