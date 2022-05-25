import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import React from 'react';

import { PaddedContainer } from '../../containers';
import { custom } from '../../../../theme/theme.styles';
import { jackpotModel } from '../../../models';

const Jackpot = ({ jackpotData }) => {
  const jackpot = jackpotModel(jackpotData);

  const currencyFormat = (num) => {
    return `R${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  };

  return (
    <PaddedContainer>
      <View style={custom.jackpotCard}>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Date</Text>
          <Text style={custom.jackpotData}>{jackpot.date}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Time</Text>
          <Text style={custom.jackpotData}>{jackpot.time}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Casino</Text>
          <Text style={custom.jackpotData}>{jackpot.casino}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Machine</Text>
          <Text style={custom.jackpotData}>{jackpot.machine}</Text>
        </View>
        <View style={custom.rowAlign}>
          <Text style={custom.jackpotData}>Event</Text>
          <Text style={custom.jackpotData}>{jackpot.event}</Text>
        </View>
        <View style={custom.line} />
        <Text style={custom.smallCenterSubtitle}>Amount</Text>
        <Text style={custom.gameName}>{currencyFormat(jackpot.amount)}</Text>
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
