import React, { useEffect } from 'react';
import { Dimensions, View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { custom } from '../../../../../theme/theme.styles';

import { PaddedContainer } from '../../../../components/containers';
import { LoadingComponent, RedeemedClaim } from '../../../../components';
import { carWashSelector } from '../../../../reducers/car-wash-reducer/car-wash.reducer';
import { getClaimHistoryAction } from '../../../../reducers/car-wash-reducer/car-wash.actions';
import { userSelector } from '../../../../reducers/user-reducer/user.reducer';

const { width: screenWidth } = Dimensions.get('window');

const RedeemedCarWashesScreen = () => {
  const dispatch = useDispatch();
  const { carWashes, isLoading } = useSelector(carWashSelector);
  const { user } = useSelector(userSelector);

  const renderCarWashVouchers = ({ item }) => <RedeemedClaim claimHistoryData={item} />;

  useEffect(() => {
    dispatch(getClaimHistoryAction(user.cmpAccountNumber));
  }, []);

  return isLoading ? (
    <View style={custom.loaderMargin}>
      <LoadingComponent hasBackground={false} />
    </View>
  ) : (
    <SafeAreaView>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Redeemed Car Washes</Text>
      </PaddedContainer>
      <PaddedContainer style={custom.center}>
        <FlatList
          style={[styles.carWashDimensions, custom.jackpotScrolViewMargin]}
          data={carWashes.data}
          renderItem={renderCarWashVouchers}
        />
      </PaddedContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carWashDimensions: {
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
});

RedeemedCarWashesScreen.propTypes = {};

RedeemedCarWashesScreen.defaultProps = {};

export default RedeemedCarWashesScreen;
