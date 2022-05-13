import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { ScrollContainer } from '../../../components/containers';
import { custom } from '../../../../theme/theme.styles';

const JackpotPredictionsScreen = () => {
  return (
    <ScrollContainer>
      <View style={custom.nameContainer}>
        <Text style={custom.centerTitleS}>Jackpot predictions</Text>
      </View>
    </ScrollContainer>
  );
};

JackpotPredictionsScreen.propTypes = {};

JackpotPredictionsScreen.defaultProps = {};

export default JackpotPredictionsScreen;
