import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { custom } from '../../../../theme/theme.styles';
import Slot from '../../../components/molecules/slot';
import {
  getRedHotSlotsAction,
  getSlotPredictionsAction,
} from '../../../reducers/hot-slot-predictions-reducer/hot-slot-predictions.actions';
import { hotSlotPredictionsSelector } from '../../../reducers/hot-slot-predictions-reducer/hot-slot-predictions.reducer';

const { width: screenWidth } = Dimensions.get('window');

const JackpotPredictionsScreen = () => {
  const dispatch = useDispatch();
  const [carouselRef, setCarouselRef] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const { redHotSlots, slotPredictions } = useSelector(hotSlotPredictionsSelector);

  const lists = [{ name: 'Red Hot Slots' }, { name: 'Slots Predictions' }];
  const predictions = [{ prediction: redHotSlots }, { prediction: slotPredictions }];

  const renderSlotCards = ({ item }) => <Slot slotData={item} />;

  const _setActiveSlideIndex = (index) => {
    setActiveIndex(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRedHotSlotsAction());
      dispatch(getSlotPredictionsAction());
    }, []),
  );

  return (
    <SafeAreaView>
      <Text style={[custom.centerTitle, custom.topPadding]}>Hot Slot Predictions</Text>
      <View style={custom.headerContainer}>
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
            />
          )}
          sliderWidth={screenWidth * 0.9}
          itemWidth={screenWidth * 0.85}
          onSnapToItem={_setActiveSlideIndex}
          removeClippedSubviews={false}
          layout="default"
        />
      </View>
    </SafeAreaView>
  );
};

JackpotPredictionsScreen.propTypes = {};

JackpotPredictionsScreen.defaultProps = {};

export default JackpotPredictionsScreen;
