import React from 'react';
import { Text, ListItem, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const { isLoading } = useSelector((reducers) => reducers.healthSurveyReducer);

  const _handleHealthSurveyPress = () => {
    dispatch(initiateHealthSurveyAction()).then(() => {
      navigation.push('HealthSurvey');
    });
  };

  return (
    <ScrollContainer>
      <Text h4>{user.firstName}</Text>
      <Button title="planning on visiting" onPress={_handleHealthSurveyPress} loading={isLoading} />
      {membershipCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
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
