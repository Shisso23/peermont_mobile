import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Text } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Dimensions, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { EarnTransaction, LoadingComponent, Transaction } from '../../../components';
import {
  getEarnTransactions,
  getTransactions,
} from '../../../reducers/payments-reducer/payments.actions';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TransactionsScreen = () => {
  const { earnTransactions, transactions, isLoading, isLoadingOutlet } = useSelector(
    (reducers) => reducers.paymentReducer,
  );
  const dispatch = useDispatch();
  const [carouselRef, setCarouselRef] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const lists = [{ name: 'Payment Transactions' }, { name: 'Outlet Transactions' }];
  const predictions = [{ transaction: transactions }, { transaction: earnTransactions }];

  const _setActiveSlideIndex = (index) => {
    setActiveIndex(index);
  };

  const renderSlotCards = ({ item }) =>
    _.isEmpty(item.VendorName) ? (
      <Transaction transaction={item} key={_.get(item, 'id')} />
    ) : (
      <EarnTransaction transaction={item} />
    );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTransactions());
      dispatch(getEarnTransactions());
    }, []),
  );

  return !isLoading && !isLoadingOutlet ? (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Mobile App Transactions</Text>
      </PaddedContainer>
      <View style={custom.center}>
        <Pagination
          renderDots={() =>
            lists.map((value, index) => (
              <TouchableOpacity
                key={value.name}
                onPress={() => {
                  carouselRef._snapToItem(carouselRef._getPositionIndex(index));
                }}
              >
                {_.isEqual(activeIndex, index) ? (
                  <Text style={custom.activeCardPagination}>{value.name}</Text>
                ) : (
                  <Text style={custom.inactiveCardPagination}>{value.name}</Text>
                )}
              </TouchableOpacity>
            ))
          }
          activeDotIndex={activeIndex}
          dotsLength={2}
        />
        <Carousel
          ref={(ref) => setCarouselRef(ref)}
          data={predictions}
          renderItem={({ item }) => (
            <FlatList
              scrollEnabled={item.transaction.length > 4}
              data={item.transaction}
              renderItem={renderSlotCards}
              style={styles.flatlistHeight}
            />
          )}
          sliderWidth={screenWidth * 0.9}
          itemWidth={screenWidth * 0.85}
          onSnapToItem={_setActiveSlideIndex}
          removeClippedSubviews={false}
          layout="default"
          initialScrollIndex={activeIndex}
          onScrollToIndexFailed={0}
        />
      </View>
      <Divider />
    </ScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

const styles = StyleSheet.create({
  flatlistHeight: {
    height: screenHeight * 0.6,
  },
});

export default TransactionsScreen;
