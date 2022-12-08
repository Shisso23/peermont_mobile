import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Divider, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { qrScanner } from '../../../../assets/animations';
import { OtpNumericInput, QrInputModal } from '../../../../components';
import { sendCanClaimOtpAction } from '../../../../reducers/car-wash-reducer/car-wash.actions';
import { carWashSelector } from '../../../../reducers/car-wash-reducer/car-wash.reducer';

const { width: screenWidth } = Dimensions.get('window');

const ScannerSelectScreen = () => {
  const navigation = useNavigation();
  const [showInputModal, setShowInputModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [useScanner, setUseScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { voucher, messages } = useSelector(carWashSelector);

  const _closeModal = (close) => {
    setShowInputModal(close);
  };

  const _closeOtpModal = (close) => {
    setShowOtpModal(close);
  };

  useEffect(() => {
    if (!isLoading) {
      if (messages.succeeded) {
        setIsLoading(true);
        if (useScanner) {
          navigation.navigate('Scanner');
        } else {
          setShowInputModal(true);
        }
      }
    }
  }, [messages]);

  const enterInputQrCode = () => {
    setUseScanner(false);
    setShowOtpModal(true);
    dispatch(sendCanClaimOtpAction());
    setIsLoading(false);
  };

  const enterScannerQrCode = () => {
    setUseScanner(true);
    setShowOtpModal(true);
    dispatch(sendCanClaimOtpAction());
    setIsLoading(false);
  };

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
      <Button title="Scan QR Code" onPress={enterScannerQrCode} />
      <Text style={[custom.centerSubtitle, styles.textMargin]}>Or</Text>
      <Button
        title="Enter QR Code"
        buttonStyle={custom.carWashHomeButtonWhite}
        titleStyle={custom.carWashHomeTitleBlue}
        type="outline"
        onPress={enterInputQrCode}
      />
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeOtpModal}
        verificationType="CAR_WASH"
        voucherData={voucher}
      />
      <QrInputModal closeModal={_closeModal} visible={showInputModal} />
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
