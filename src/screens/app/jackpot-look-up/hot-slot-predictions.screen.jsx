import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, FlatList, SafeAreaView, View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { custom } from '../../../../theme/theme.styles';
import {
  getRankedPredictionsByCasinoAction,
  getRankedRedHotSlotsByCasinoAction,
  getRedHotSlotsAction,
  getSlotPredictionsAction,
} from '../../../reducers/hot-slot-predictions-reducer/hot-slot-predictions.actions';
import { hotSlotPredictionsSelector } from '../../../reducers/hot-slot-predictions-reducer/hot-slot-predictions.reducer';
import { HotSlotPrediction, LoadingComponent } from '../../../components';
import { PredictionsForm } from '../../../components/forms';
import { predictionsFormModel } from '../../../models';
import { hotSlotPredictionsCasinoCodeList } from '../../../helpers/casino-dropdown-helper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HotSlotPredictionsScreen = () => {
  const dispatch = useDispatch();
  const [carouselRef, setCarouselRef] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const casinos = hotSlotPredictionsCasinoCodeList;

  const { redHotSlots, slotPredictions, isLoading } = useSelector(hotSlotPredictionsSelector);

  const lists = [{ name: 'Red Hot Slots' }, { name: 'Slots Predictions' }];
  const predictions = [{ prediction: redHotSlots }, { prediction: slotPredictions }];

  const renderSlotCards = ({ item }) => <HotSlotPrediction HotSlotPredictionData={item} />;

  const _setActiveSlideIndex = (index) => {
    setActiveIndex(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRedHotSlotsAction());
      dispatch(getSlotPredictionsAction());
    }, []),
  );

  const _handleFormSubmit = (formData) => {
    if (!_.isEmpty(formData)) {
      if (activeIndex === 0) {
        dispatch(getRankedRedHotSlotsByCasinoAction(casinos[formData.casino]));
      } else {
        dispatch(getRankedPredictionsByCasinoAction(casinos[formData.casino]));
      }
    }
  };

  return isLoading ? (
    <View style={custom.loaderMargin}>
      <LoadingComponent hasBackground={false} />
    </View>
  ) : (
    <SafeAreaView>
      <Text style={[custom.centerTitle, custom.topPadding]}>Hot Slot Predictions</Text>
      <View style={custom.center}>
        <PredictionsForm initialValues={predictionsFormModel()} submitForm={_handleFormSubmit} />
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
              scrollEnabled={item.prediction.length > 4}
              data={item.prediction}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatlistHeight: {
    height: screenHeight * 0.6,
  },
});

export default HotSlotPredictionsScreen;
