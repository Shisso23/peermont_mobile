import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CurrencyIcon = () => {
  return <Text style={styles.text}>R </Text>;
};

const styles = StyleSheet.create({
  text: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
});

CurrencyIcon.propTypes = {};

CurrencyIcon.defaultProps = {};

export default CurrencyIcon;
