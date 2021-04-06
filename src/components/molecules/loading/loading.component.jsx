import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../../../theme/theme.colors';

const LoadingComponent = ({ hasBackground }) => {
  return (
    <View style={[styles.container, hasBackground && { backgroundColor: colors.white }]}>
      <ActivityIndicator size="large" color={colors.gold} />
    </View>
  );
};

LoadingComponent.propTypes = {
  hasBackground: PropTypes.bool,
};

LoadingComponent.defaultProps = {
  hasBackground: true,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingComponent;
