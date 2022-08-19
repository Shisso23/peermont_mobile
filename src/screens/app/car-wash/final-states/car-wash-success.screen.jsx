import React from 'react';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import SuccessComponent from '../../../../components/molecules/success';

const CarWashSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardScrollContainer>
      <View style={custom.carWashSuccessMargin}>
        <SuccessComponent />
      </View>
      <PaddedContainer>
        <Text style={custom.centerTitleBlack}>Congratulations</Text>
        <Divider />
        <Text style={custom.centerSubtitle}>
          You have succesfully claimed your car wash membership benefit
        </Text>
      </PaddedContainer>
      <View style={custom.carWashDoneMargin}>
        <Button
          title="Done"
          buttonStyle={custom.carWashHomeButtonBlue}
          onPress={() => navigation.navigate('App Home')}
        />
      </View>
    </KeyboardScrollContainer>
  );
};

CarWashSuccessScreen.propTypes = {};

CarWashSuccessScreen.defaultProps = {};

export default CarWashSuccessScreen;
