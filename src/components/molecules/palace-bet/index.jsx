import React from 'react';
import { View, TouchableOpacity, Image, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { custom } from '../../../../theme/theme.styles';

const palaceBetIcon = require('../../../assets/images/palace-bet-blue.png');

const PalaceBet = () => {
  const onPalaceBetPress = () => {
    Linking.openURL(appConfig.palaceBetLink);
  };

  const PalaceBetViewContainer = ({ children }) => {
    return (
      <TouchableOpacity style={custom.headerButton} onPress={onPalaceBetPress}>
        {children}
      </TouchableOpacity>
    );
  };

  PalaceBetViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PalaceBetViewContainer>
      <Image source={palaceBetIcon} style={custom.palaceBetIcon} />
      <View style={custom.surveyText}>
        <Text style={custom.surveyTitle}>PalaceBet</Text>
        <Text style={custom.surveySubText}>Place your bets Online</Text>
      </View>
    </PalaceBetViewContainer>
  );
};

PalaceBet.propTypes = {};
PalaceBet.defaultProps = {};

export default PalaceBet;
