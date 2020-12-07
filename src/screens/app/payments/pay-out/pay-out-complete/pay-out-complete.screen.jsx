import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useBackButtonLoader } from '../../../../../hooks';
import { reloadCurrentMembershipCardBalanceAction } from '../../../../../reducers/membership-card-reducer/membership-card.actions';

const PayOutCompleteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useBackButtonLoader(() => {
    dispatch(reloadCurrentMembershipCardBalanceAction()).then(() => {
      navigation.pop();
    });
  });

  return (
    <View>
      <Text>Your payout has been submitted, you will be notified when it has been proccessed</Text>
    </View>
  );
};

PayOutCompleteScreen.propTypes = {};

PayOutCompleteScreen.defaultProps = {};

export default PayOutCompleteScreen;
