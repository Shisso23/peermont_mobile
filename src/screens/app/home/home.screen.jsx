import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';

import { MembershipCardCarouselItem, SplashAd, PalaceBetInstall } from '../../../components';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { useBiometricRegister, handleNotificationOpenedBackGround } from '../../../hooks';
import { hasIncomingNotification } from '../../../reducers/notification-reducer/notification.actions';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { custom } from '../../../../theme/theme.styles';
import { getSplashAdvertAction } from '../../../reducers/advert-reducer/advert.actions';
import { JackpotListSelect } from '../../../components/atoms';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const biometricRegister = useBiometricRegister();
  const notificationOpenedBackGround = handleNotificationOpenedBackGround();
  const route = useRoute();
  const [visible, setVisible] = useState(false);

  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector(membershipCardSelector);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  const _closeModal = () => {
    navigation.setParams({ visible: false });
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({ visible: false });
      dispatch(hasIncomingNotification());
    }, []),
  );

  useEffect(() => {
    notificationOpenedBackGround();
    biometricRegister().then();
    dispatch(getSplashAdvertAction());
  }, []);

  useEffect(() => {
    if (_.isEqual(_.get(route.params, 'visible'), true)) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [_.get(route.params, 'visible'), visible]);

  useFocusEffect(exitAppOnHardwarePressListener);
  const _keyExtractor = (item) => _.get(item, 'id', '').toString();

  return (
    <ScrollContainer>
      <SplashAd />
      <PaddedContainer>
        <View style={custom.headerContainer}>
          {!_.isEqual(Platform.OS, 'huawei') ? <PalaceBetInstall /> : null}
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
        <View style={custom.carouselContainer}>
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
            dotStyle={custom.activePagination}
            inactiveDotStyle={custom.inactivePagination}
            containerStyle={custom.containerStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
        </View>
      )}
      <PaddedContainer>
        <Button title="Add Card" onPress={() => navigation.navigate('AddMembershipCard')} />
      </PaddedContainer>
      {visible ? <JackpotListSelect visible={visible} closeModal={_closeModal} /> : null}
    </ScrollContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
