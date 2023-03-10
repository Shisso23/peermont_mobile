import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { palaceBetIconBlue } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth } = Dimensions.get('window');

const PalaceBet = () => {
  const onPalaceBetPress = () => {
    Linking.openURL(appConfig.palaceBetLink);
  };

  const PalaceBetViewContainer = ({ children }) => {
    return (
      <TouchableOpacity style={[custom.headerButton, styles.addWidth]} onPress={onPalaceBetPress}>
        {children}
      </TouchableOpacity>
    );
  };

  PalaceBetViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PalaceBetViewContainer>
      <Image source={palaceBetIconBlue} style={custom.palaceBetIcon} />
      <View style={custom.headerContainerText}>
        <Text style={custom.headerContainerTitle}>Visit PalaceBet</Text>
        <Text style={custom.headerContainerSubText}>Place your bets on a wide range of sports</Text>
      </View>
    </PalaceBetViewContainer>
  );
};

const styles = StyleSheet.create({
  addWidth: {
    width: screenWidth * 0.9,
  },
});

PalaceBet.propTypes = {};
PalaceBet.defaultProps = {};

export default PalaceBet;
