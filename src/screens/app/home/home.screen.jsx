import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import _ from 'lodash';

import colors from '../../../../theme/theme.colors';
import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { useMembershipCard, useBiometricRegister } from '../../../hooks';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import getCardType from '../../../helpers/getCardType';

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
        <Text h3>{user.firstName}</Text>
      </PaddedContainer>
      <ListItem onPress={_handleHealthSurveyPress} bottomDivider>
        <ListItem.Content>
          <ListItem.Title h4>Plan on visiting?</ListItem.Title>
          <ListItem.Subtitle>Take our health survey.</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <PaddedContainer>
        <Text h3>Winners Circle Cards</Text>
      </PaddedContainer>
      {_.isEmpty(membershipCards) ? (
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>You don&#39;t have any Winners Circle Cards setup</ListItem.Title>
            <ListItem.Subtitle>Click the button below to add a card.</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
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
