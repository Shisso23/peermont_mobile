import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { palaceBetIconBlue } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth } = Dimensions.get('window');

const PalaceBetInstall = () => {
  const onPalaceBetInstallPress = () => {
    Linking.openURL(appConfig.palaceBetAndroidAppLink);
  };

  const PalaceBetInstallViewContainer = ({ children }) => {
    return (
      <TouchableOpacity style={custom.headerButton} onPress={onPalaceBetInstallPress}>
        {children}
      </TouchableOpacity>
    );
  };

  PalaceBetInstallViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PalaceBetInstallViewContainer>
      <Image source={palaceBetIconBlue} style={custom.palaceBetIcon} />
      <View style={custom.headerContainerText}>
        <Text style={[custom.headerContainerTitle, styles.centerPalaceBetButtons]}>
          Install PalaceBet
        </Text>
        <Text style={[custom.headerContainerSubText, styles.centerPalaceBetButtons]}>
          Download the Palace Bet App
        </Text>
      </View>
    </PalaceBetInstallViewContainer>
  );
};

const styles = StyleSheet.create({
  centerPalaceBetButtons: {
    left: screenWidth * 0.1,
  },
});

PalaceBetInstall.propTypes = {};
PalaceBetInstall.defaultProps = {};

export default PalaceBetInstall;
