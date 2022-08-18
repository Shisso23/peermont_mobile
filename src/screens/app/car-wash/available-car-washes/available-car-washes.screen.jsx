import React, { useEffect } from 'react';
import { Dimensions, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { custom } from '../../../../../theme/theme.styles';

import { PaddedContainer } from '../../../../components/containers';
import { CarWashVoucher, LoadingComponent } from '../../../../components';
import { carWashSelector } from '../../../../reducers/car-wash-reducer/car-wash.reducer';
import { getAvailableCarWashesAction } from '../../../../reducers/car-wash-reducer/car-wash.actions';

const { width: screenWidth } = Dimensions.get('window');

const AvailableCarWashesScreen = () => {
  const dispatch = useDispatch();
  const { vouchers, isLoading } = useSelector(carWashSelector);

  const renderCarWashVouchers = ({ item }) => <CarWashVoucher voucherData={item} />;

  useEffect(() => {
    dispatch(getAvailableCarWashesAction('1000000003', 'PLATINUM'));
  }, []);

  return isLoading ? (
    <View style={custom.loaderMargin}>
      <LoadingComponent hasBackground={false} />
    </View>
  ) : (
    <SafeAreaView>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Available Carwashes</Text>
      </PaddedContainer>
      <PaddedContainer style={custom.center}>
        <FlatList
          style={[styles.voucherDimensions, custom.jackpotScrolViewMargin]}
          data={vouchers.data}
          renderItem={renderCarWashVouchers}
        />
      </PaddedContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  voucherDimensions: {
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

AvailableCarWashesScreen.propTypes = {};

AvailableCarWashesScreen.defaultProps = {};

export default AvailableCarWashesScreen;
