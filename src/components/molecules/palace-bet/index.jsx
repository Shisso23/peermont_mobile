import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import appConfig from '../../../config';
import { custom } from '../../../../theme/theme.styles';

const palaceBetIcon = require('../../../assets/images/palace-bet-blue.png');

const PalaceBet = () => {
  const PalaceBetViewContainer = ({ children }) => {
    return (
      <View style={custom.surveyContainer}>
        <TouchableOpacity
          style={custom.headerButton}
          onPress={() => Linking.openURL(appConfig.palaceBetLink)}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  };

  PalaceBetViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <PalaceBetViewContainer>
      <Image source={palaceBetIcon} style={styles.palaceBetSize} />
      <View style={custom.surveyText}>
        <Text style={custom.surveyTitle}>PalaceBet</Text>
        <Text style={custom.surveySubText}>Place bets on a wide range of sports</Text>
      </View>
    </PalaceBetViewContainer>
  );
};

const styles = StyleSheet.create({
  palaceBetSize: {
    height: 32,
    width: 34,
  },
});

PalaceBet.propTypes = {};
PalaceBet.defaultProps = {};

export default PalaceBet;
