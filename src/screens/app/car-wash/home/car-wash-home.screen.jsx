import React from 'react';
import { Image, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { carWashImage } from '../../../../assets';

const CarWashHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Car Wash</Text>
      </PaddedContainer>
      <PaddedContainer>
        <Image source={carWashImage} />
      </PaddedContainer>
      <View style={custom.carWashDoneMargin} />
      <PaddedContainer>
        <Button
          title="Available Car Washes"
          buttonStyle={custom.carWashHomeButtonBlue}
          onPress={() => navigation.navigate('AvailableCarWashes')}
        />
        <Divider />
        <Button
          title="Redeemed Car Washes"
          buttonStyle={custom.carWashHomeButtonWhite}
          titleStyle={custom.carWashHomeTitleBlue}
          type="outline"
          onPress={() => navigation.navigate('RedeemedCarWashes')}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

CarWashHomeScreen.propTypes = {};

CarWashHomeScreen.defaultProps = {};

export default CarWashHomeScreen;
