import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { ScrollContainer } from '../../../components/containers';
import { custom } from '../../../../theme/theme.styles';

const JackpotListScreen = () => {
  return (
    <ScrollContainer>
      <View style={custom.nameContainer}>
        <Text style={custom.centerTitleS}>Jackpot List</Text>
      </View>
    </ScrollContainer>
  );
};

JackpotListScreen.propTypes = {};

JackpotListScreen.defaultProps = {};

export default JackpotListScreen;
