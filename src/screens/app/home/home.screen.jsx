import React from 'react';
import { Text, Button, Divider } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from '../../../components/containers';
import { exitAppOnHardwarePressListener } from '../../../helpers';
import { initiateHealthSurveyAction } from '../../../reducers/health-survey-reducer/health-survey.actions';
import { MembershipCard } from '../../../components/molecules';
import { useMembershipCard } from '../../../hooks';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(exitAppOnHardwarePressListener, []);
  const { user } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);

  const { viewMembershipCard } = useMembershipCard();

  const { isLoading: isHealthSurveyLoading } = useSelector(
    (reducers) => reducers.healthSurveyReducer,
  );

  const _handleHealthSurveyPress = () => {
    dispatch(initiateHealthSurveyAction()).then(() => {
      navigation.push('HealthSurvey');
    });
  };

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
      {membershipCards.map((item, index) => {
        return (
          <MembershipCard
            key={item.id}
            card={item}
            onPress={() => viewMembershipCard(item.id, index)}
          />
        );
      })}
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

export default HomeScreen;
