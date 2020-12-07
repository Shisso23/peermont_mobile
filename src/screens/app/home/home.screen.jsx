import React, { useState } from 'react';
import _ from 'lodash';
import { Text, ListItem, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { LoadingComponent } from '../../../components/molecules';
import { setCurrentMembershipCardAction } from '../../../reducers/membership-card-reducer/membership-card.reducer';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);

  const { isLoading: isHealthSurveyLoading } = useSelector(
    (reducers) => reducers.healthSurveyReducer,
  );

  const _handleHealthSurveyPress = () => {
    dispatch(initiateHealthSurveyAction()).then(() => {
      navigation.push('HealthSurvey');
    });
  };

  const _membershipCardPress = (id) => {
    dispatch(setCurrentMembershipCardAction(id));
    navigation.navigate('EnterMembershipCardPin');
  };

  return (
    <ScrollContainer>
      <Text h4>{user.firstName}</Text>
      <Button
        title="planning on visiting"
        onPress={_handleHealthSurveyPress}
        loading={isHealthSurveyLoading}
      />
      {membershipCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider onPress={() => _membershipCardPress(item.id)}>
            <ListItem.Content>
              <ListItem.Title>{item.cardNumber}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
