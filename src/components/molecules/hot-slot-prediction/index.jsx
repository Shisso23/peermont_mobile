import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React from 'react';

import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';
import { hotSlotPredictionsModel } from '../../../models/app/hot-slot-predictions/hot-slot-predictions.model';

const HotSlotPrediction = ({ HotSlotPredictionData }) => {
  const hotSlotPrediction = hotSlotPredictionsModel(HotSlotPredictionData);

  return (
    <PaddedContainer>
      <View style={custom.jackpotCard}>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Area</Text>
          <Text style={custom.jackpotData}>{hotSlotPrediction.area}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Machine</Text>
          <Text style={custom.jackpotData}>{hotSlotPrediction.machine}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Casino</Text>
          <Text style={custom.jackpotData}>{hotSlotPrediction.casino}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Denom</Text>
          <Text style={custom.jackpotData}>{hotSlotPrediction.denom}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Ranking</Text>
          <Text style={custom.jackpotData}>{hotSlotPrediction.ranking}</Text>
        </View>
        <View style={custom.line} />
        <Text style={custom.smallCenterSubtitle}>Game Name</Text>
        <Text style={custom.gameName}>{hotSlotPrediction.gameName}</Text>
      </View>
    </PaddedContainer>
  );
};

HotSlotPrediction.propTypes = {
  HotSlotPredictionData: PropTypes.object.isRequired,
};

export default HotSlotPrediction;
