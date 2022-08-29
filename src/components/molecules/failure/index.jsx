import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import PaddedContainer from '../../containers/buttons-container/buttons.container';
import { failure } from '../../../assets/animations';

const { width: screenWidth } = Dimensions.get('window');

const FailureComponent = () => {
  return (
    <PaddedContainer>
      <LottieView style={styles.icon} source={failure} autoPlay loop={false} />
    </PaddedContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
    width: screenWidth * 0.7,
  },
});

export default FailureComponent;
