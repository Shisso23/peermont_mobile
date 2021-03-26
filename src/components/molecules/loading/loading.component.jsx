import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import colors from '../../../../theme/theme.colors';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gold} />
    </View>
  );
};

LoadingComponent.propTypes = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingComponent;
