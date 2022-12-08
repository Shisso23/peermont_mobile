import PropTypes from 'prop-types';
import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';

import { custom } from '../../../../theme/theme.styles';
import { voucherModel } from '../../../models';
import { carWashIcon, ticketIcon, ticketLine } from '../../../assets';
import { setCurrentVoucher } from '../../../reducers/car-wash-reducer/car-wash.actions';

const CarWashVoucher = ({ voucherData }) => {
  const voucher = voucherModel(voucherData);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const _navigateScannerSelect = () => {
    dispatch(setCurrentVoucher(voucher));
    navigation.navigate('ScannerSelect');
  };

  return (
    <ImageBackground source={ticketIcon} style={custom.carWashIconBackground} resizeMode="cover">
      <View style={custom.row}>
        <View style={custom.row}>
          <Image source={carWashIcon} style={custom.carwashIconPosition} />
          <Text style={custom.centerTitleCarwash}>{voucher.displayName}</Text>
        </View>
      </View>
      <Text style={custom.carWashVoucherDescription}>{voucher.benefitDescription}</Text>
      <Text style={custom.carWashVoucherExpiration}>{voucher.endDate}</Text>
      <Image source={ticketLine} style={custom.dottedLineWidth} />
      <Button
        containerStyle={custom.claimContainer}
        buttonStyle={custom.claimButton}
        titleStyle={custom.claimTitle}
        title="Claim"
        onPress={_navigateScannerSelect}
      />
    </ImageBackground>
  );
};

CarWashVoucher.propTypes = {
  voucherData: PropTypes.object,
};

CarWashVoucher.defaultProps = {
  voucherData: { name: 'Test' },
};

export default CarWashVoucher;
