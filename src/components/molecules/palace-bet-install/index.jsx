import React from 'react';
import { View, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { palaceBetIconBlue } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';

const PalaceBetInstall = () => {
  const onPalaceBetInstallPress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(appConfig.palaceBetIosAppLink);
    } else {
      Linking.openURL(appConfig.palaceBetAndroidAppLink);
    }
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
        <Text style={[custom.headerContainerTitle, custom.centerPalaceBetText]}>PalaceBet</Text>
        <Text style={[custom.headerContainerSubText, custom.centerPalaceBetText]}>
          Play your favourite live games. Bet on sports
        </Text>
      </View>
    </PalaceBetInstallViewContainer>
  );
};

PalaceBetInstall.propTypes = {};
PalaceBetInstall.defaultProps = {};

export default PalaceBetInstall;
