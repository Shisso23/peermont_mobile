import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';

import colors from '../../../../theme/theme.colors';
import { PageContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { useMembershipCard } from '../../../hooks';
import getCardType from '../../../helpers/getCardType';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { viewMembershipCard } = useMembershipCard();

  const { isLoading: isHealthSurveyLoading } = useSelector(
    (reducers) => reducers.healthSurveyReducer,
  );

  const _handleHealthSurveyPress = () => {
    dispatch(initiateHealthSurveyAction()).then(() => {
      navigation.push('HealthSurvey');
    });
  };

  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  // eslint-disable-next-line react/prop-types
  const _renderMembershipCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => viewMembershipCard(_.get(item, 'id'), index)}>
        <Image
          resizeMode="contain"
          style={styles.carouselImage}
          source={getCardType(_.get(item, 'tierName'))}
        />
        <Text style={styles.carouselCardNumber}>{_.get(item, 'cardNumber')}</Text>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item) => _.get(item, 'id', '').toString();

  return (
    <PageContainer>
      <Text h4>{user.firstName}</Text>
      <Divider />
      <Button
        title="planning on visiting"
        onPress={_handleHealthSurveyPress}
        loading={isHealthSurveyLoading}
      />
      <Divider />
      <Text h4>Select Card</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={membershipCards}
          extraData={membershipCards}
          renderItem={_renderMembershipCardItem}
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
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      </View>
      <Divider />
      <Button
        title="Add Winners Circle Card"
        onPress={() => navigation.navigate('AddMembershipCard')}
      />
    </PageContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

const styles = StyleSheet.create({
  activePagination: {
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    height: 10,
    marginHorizontal: -4,
    width: 10,
  },
  carouselCardNumber: {
    alignSelf: 'center',
    bottom: 15,
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  carouselImage: {
    height: 200,
    width: 250,
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
