import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { sparklingCar } from '../../../../assets/animations';

const { width: screenWidth } = Dimensions.get('window');

const CarWashHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Car Wash</Text>
      </PaddedContainer>
      <PaddedContainer>
        <LottieView style={styles.icon} source={sparklingCar} autoPlay loop />
      </PaddedContainer>
      <PaddedContainer>
        <Button
          title="Available Car Washes"
          buttonStyle={custom.carWashHomeButtonBlue}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Divider />
        <Button
          title="Available Car Washes"
          buttonStyle={custom.carWashHomeButtonWhite}
          titleStyle={custom.carWashHomeTitleBlue}
          type="outline"
          onPress={() => navigation.navigate('Notifications')}
        />
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
    width: screenWidth * 0.7,
  },
});

CarWashHomeScreen.propTypes = {};

CarWashHomeScreen.defaultProps = {};

export default CarWashHomeScreen;
