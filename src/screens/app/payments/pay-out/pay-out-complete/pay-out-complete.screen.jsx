import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useBackButtonLoader } from '../../../../../hooks';
import { custom } from '../../../../../../theme/theme.styles';
import { PaddedContainer } from '../../../../../components/containers';

const PayOutCompleteScreen = () => {
  const navigation = useNavigation();
  useBackButtonLoader(() => {
    navigation.pop(2);
  });

  return (
    <View>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Success!</Text>
        <Text style={custom.centerSubtitle}>
          Your payout has been submitted for approval, it may take up to 48 hours (excl. public
          holidays and weekends) to appear in your bank account.
        </Text>
      </PaddedContainer>
    </View>
  );
};

PayOutCompleteScreen.propTypes = {};

PayOutCompleteScreen.defaultProps = {};

export default PayOutCompleteScreen;
