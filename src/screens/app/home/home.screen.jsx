import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';

import colors from '../../../../theme/theme.colors';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { useMembershipCard, useBiometricRegister } from '../../../hooks';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import getCardType from '../../../helpers/getCardType';
import { custom } from '../../../../theme/theme.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const biometricRegister = useBiometricRegister();
  useFocusEffect(exitAppOnHardwarePressListener);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { viewMembershipCard } = useMembershipCard();

  const _handleHealthSurveyPress = () => {
    dispatch(initiateHealthSurveyAction()).then(() => {
      navigation.navigate('HealthSurvey');
    });
  };

  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  useEffect(() => {
    biometricRegister();
  }, []);

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
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitleSmall}>{user.firstName}</Text>
      </PaddedContainer>
      <PaddedContainer>
        <View style={custom.surveyContainer}>
          <TouchableOpacity style={custom.surveyButton} onPress={_handleHealthSurveyPress}>
            <Icon name="cube" size={20} />
            <View style={custom.surveyText}>
              <Text style={custom.surveyTitle}>Planning on visiting?</Text>
              <Text style={custom.surveySubText}>Take our health survey to grant access.</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  carouselCardNumber: {
    alignSelf: 'center',
    bottom: 15,
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 0.28,
    borderColor: colors.inputBorderColor,
    paddingBottom: 10,
  },
  carouselImage: {
    height: 200,
    width: 250,
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
