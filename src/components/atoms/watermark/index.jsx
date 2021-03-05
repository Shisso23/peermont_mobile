import React from 'react';
import { Image, StyleSheet } from 'react-native';

const watermarkSource = require('../../../assets/images/watermark.png');

const Watermark = () => {
  return <Image source={watermarkSource} style={styles.watermark} />;
};

const styles = StyleSheet.create({
  watermark: {
    bottom: '-6%',
    position: 'absolute',
    right: '-6%',
    zIndex: -1,
  },
});

export default Watermark;
