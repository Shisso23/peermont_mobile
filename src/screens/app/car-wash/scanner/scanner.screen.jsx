import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { barCodeFrame } from '../../../../assets';
import { carWashSelector } from '../../../../reducers/car-wash-reducer/car-wash.reducer';
import { claimCarWashVoucherAction } from '../../../../reducers/car-wash-reducer/car-wash.actions';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ScannerScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [message, setMessage] = useState(false);
  const [active, setActive] = useState(true);
  const devices = useCameraDevices();
  const device = devices.back;
  const dispatch = useDispatch();
  const { voucher, messages } = useSelector(carWashSelector);

  const [frameProcessor, barcodeResults] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (!_.isEmpty(barcodeResults) && active) {
      setActive(false);
      dispatch(
        claimCarWashVoucherAction(
          '10000000013',
          'PLATINUM',
          barcodeResults[0].content.data,
          voucher.id,
        ),
      );
      setMessage(true);
    }
  }, [barcodeResults]);

  useEffect(() => {
    if (message) {
      if (!_.isEmpty(messages)) {
        if (messages.succeeded) {
          navigation.navigate('CarWashSuccess');
        } else {
          navigation.navigate('CarWashFailure');
        }
      }
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
          frameProcessor={frameProcessor}
          frameProcessorFps={10}
        />
        <Image source={barCodeFrame} style={styles.barCodeFrame} />
      </>
    )
  );
};

const styles = StyleSheet.create({
  barCodeFrame: {
    alignSelf: 'center',
    height: 250,
    top: screenHeight * 0.3,
    width: 250,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 130,
    marginTop: 40,
    width: screenWidth * 0.7,
  },
});

ScannerScreen.propTypes = {};

ScannerScreen.defaultProps = {};

export default ScannerScreen;
