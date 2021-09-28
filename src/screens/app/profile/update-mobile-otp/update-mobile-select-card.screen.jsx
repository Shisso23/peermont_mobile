import _ from 'lodash';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { PaddedContainer } from '../../../../components/containers';
import { membershipCardSelector } from '../../../../reducers/membership-card-reducer/membership-card.reducer';
import { MembershipCardCarouselItem } from '../../../../components';
import { custom } from '../../../../../theme/theme.styles';
import colors from '../../../../../theme/theme.colors';

const UpdateMobileSelectCardScreen = () => {
  const { membershipCards } = useSelector(membershipCardSelector);

  const { params } = useRoute();
  const unconfirmedMobileNumber = _.get(params, 'unconfirmedMobileNumber');

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const _keyExtractor = (item) => _.get(item, 'id', '').toString();

  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  return (
    !_.isEmpty(membershipCards) && (
      <PaddedContainer>
        <Text style={custom.centerTitle}>Select Card</Text>
        <View style={styles.carouselContainer}>
          <Carousel
            data={membershipCards}
            extraData={membershipCards}
            renderItem={({ item, index }) => (
              <MembershipCardCarouselItem
                item={item}
                index={index}
                unconfirmedMobileNumber={unconfirmedMobileNumber}
              />
            )}
            sliderWidth={500}
            itemWidth={250}
            onSnapToItem={_setActiveSlideIndex}
            removeClippedSubviews={false}
            keyExtractor={_keyExtractor}
          />
          <Pagination
            dotsLength={membershipCards.length}
            activeDotIndex={activeSlideIndex}
            dotStyle={styles.activePagination}
            inactiveDotStyle={styles.inactivePagination}
            containerStyle={styles.containerStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
          <Text style={custom.centerTitleSmall}>Select The Card You Changed Your Number On</Text>
        </View>
      </PaddedContainer>
    )
  );
};

const styles = StyleSheet.create({
  activePagination: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  carouselContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    bottom: -20,
  },
  containerStyle: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  inactivePagination: {
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    marginHorizontal: -5,
    width: 10,
  },
});

UpdateMobileSelectCardScreen.propTypes = {};

UpdateMobileSelectCardScreen.defaultProps = {};

export default UpdateMobileSelectCardScreen;
