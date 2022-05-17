import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React from 'react';

import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';

const Slot = ({ slotData }) => {
  return (
    <PaddedContainer>
      <View style={custom.jackpotCard}>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Area</Text>
          <Text style={custom.jackpotData}>{slotData.area}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Machine</Text>
          <Text style={custom.jackpotData}>{slotData.machine}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Denom</Text>
          <Text style={custom.jackpotData}>{slotData.denom}</Text>
        </View>
        <View style={custom.line} />
        <Text style={custom.smallCenterSubtitle}>Game Name</Text>
        <Text style={[custom.gameName]}>{slotData.name}</Text>
      </View>
    </PaddedContainer>
  );
};

Slot.propTypes = {
  slotData: PropTypes.object,
};

Slot.defaultProps = {
  slotData: { name: 'Test' },
};

export default Slot;
