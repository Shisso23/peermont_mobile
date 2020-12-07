import React from 'react';
import { Text, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { MembershipCard } from '../../../components/molecules';
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
    <PageContainer>
      <Text h4>{user.firstName}</Text>
      <Button
        title="planning on visiting"
        onPress={_handleHealthSurveyPress}
        loading={isHealthSurveyLoading}
      />
      {membershipCards.map((item) => {
        return (
          <MembershipCard key={item.id} card={item} onPress={() => _membershipCardPress(item.id)} />
        );
      })}
    </PageContainer>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
