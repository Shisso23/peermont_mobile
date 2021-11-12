import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { watermarkSource } from '../../../assets';

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
