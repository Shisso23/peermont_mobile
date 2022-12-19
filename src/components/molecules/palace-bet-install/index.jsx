import React from 'react';
import { View, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Text } from '@rneui/themed';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { palaceBetIconBlue } from '../../../assets';
import { custom } from '../../../../theme/theme.styles';

const PalaceBetInstall = () => {
  const onPalaceBetInstallPress = () => {
    Linking.openURL('palacebet://palacetbet/Home').catch(() => {
      Linking.openURL(Platform.OS === 'ios' ? appConfig.palaceBetIosAppLink : appConfig.palaceBetLink);
    });
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
          Bet on slots, live casino games or sports!
        </Text>
      </View>
    </PalaceBetInstallViewContainer>
  );
};

PalaceBetInstall.propTypes = {};
PalaceBetInstall.defaultProps = {};

export default PalaceBetInstall;
