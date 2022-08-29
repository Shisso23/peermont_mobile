import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { qrScanner } from '../../../../assets/animations';

const { width: screenWidth } = Dimensions.get('window');

const ScannerSelectScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <LottieView style={styles.icon} source={qrScanner} autoPlay />
      </PaddedContainer>
      <PaddedContainer>
        <Text style={custom.centerTitleBlack}>Scan QR</Text>
        <Divider />
        <Text style={custom.centerSubtitle}>To claim car wash membership benefit</Text>
      </PaddedContainer>
      <Button title="Scan QR Code" onPress={() => navigation.navigate('Scanner')} />
      <Text style={[custom.centerSubtitle, styles.textMargin]}>Or</Text>
      <Button
        title="Enter QR Code"
        buttonStyle={custom.carWashHomeButtonWhite}
        titleStyle={custom.carWashHomeTitleBlue}
        type="outline"
        onPress={() => navigation.navigate('RedeemedCarWashes')}
      />
    </KeyboardScrollContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginBottom: 130,
    marginTop: 40,
    width: screenWidth * 0.7,
  },
  textMargin: {
    margin: 7,
  },
});

ScannerSelectScreen.propTypes = {};

ScannerSelectScreen.defaultProps = {};

export default ScannerSelectScreen;
