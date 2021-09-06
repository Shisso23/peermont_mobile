import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';

import { MembershipCardCarouselItem, SplashAd, HealthSurvey, PalaceBet } from '../../../components';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { useBiometricRegister, handleNotificationOpenedBackGround } from '../../../hooks';
import { hasIncomingNotification } from '../../../reducers/notification-reducer/notification.actions';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { custom } from '../../../../theme/theme.styles';
import colors from '../../../../theme/theme.colors';
import { getSplashAdvertAction } from '../../../reducers/advert-reducer/advert.actions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const biometricRegister = useBiometricRegister();
  const notificationOpenedBackGround = handleNotificationOpenedBackGround();

  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector(membershipCardSelector);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(hasIncomingNotification());
    }, []),
  );

  useEffect(() => {
    notificationOpenedBackGround();
    biometricRegister().then();
    dispatch(getSplashAdvertAction());
  }, []);

  useFocusEffect(exitAppOnHardwarePressListener);
  const _keyExtractor = (item) => _.get(item, 'id', '').toString();

  return (
    <ScrollContainer>
      <SplashAd />
      <PaddedContainer>
        <View style={custom.headerContainer}>
          <HealthSurvey />
          <PalaceBet />
        </View>
      </PaddedContainer>
      <View style={custom.nameContainer}>
        <Text style={custom.centerTitleSmall}>{user.firstName}</Text>
      </View>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Select Card</Text>
        {_.isEmpty(membershipCards) && (
          <Text style={custom.centerSubtitle}>
            You don&#39;t have any Winners Circle Cards setup. Click the button below to add a card.
          </Text>
        )}
      </PaddedContainer>
      {!_.isEmpty(membershipCards) && (
        <View style={styles.carouselContainer}>
          <Carousel
            data={membershipCards}
            extraData={membershipCards}
            renderItem={({ item, index }) => (
              <MembershipCardCarouselItem item={item} index={index} />
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
        </View>
      )}
      <PaddedContainer>
        <Button title="Add Card" onPress={() => navigation.navigate('AddMembershipCard')} />
      </PaddedContainer>
    </ScrollContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

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
    borderBottomWidth: 0.28,
    borderColor: colors.inputBorderColor,
    paddingBottom: 10,
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

export default HomeScreen;
