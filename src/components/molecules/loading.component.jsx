import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import colors from '../../../theme/theme.colors';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

LoadingComponent.propTypes = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingComponent;
