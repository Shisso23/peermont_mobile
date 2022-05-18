import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React from 'react';

import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';

const Jackpot = ({ jackpotData }) => {
  return (
    <PaddedContainer>
      <View style={custom.jackpotCard}>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Date</Text>
          <Text style={custom.jackpotData}>{jackpotData.date}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Time</Text>
          <Text style={custom.jackpotData}>{jackpotData.time}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Casino</Text>
          <Text style={custom.jackpotData}>{jackpotData.casino}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Machine</Text>
          <Text style={custom.jackpotData}>{jackpotData.machine}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Event</Text>
          <Text style={custom.jackpotData}>{jackpotData.event}</Text>
        </View>
        <View style={custom.line} />
        <Text style={custom.smallCenterSubtitle}>Amount</Text>
        <Text style={custom.gameName}>{jackpotData.amount}</Text>
      </View>
    </PaddedContainer>
  );
};

Jackpot.propTypes = {
  jackpotData: PropTypes.object,
};

Jackpot.defaultProps = {
  jackpotData: { name: 'Test' },
};

export default Jackpot;
