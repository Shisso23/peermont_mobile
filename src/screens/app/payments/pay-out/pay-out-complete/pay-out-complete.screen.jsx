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
      <Text>
        Your payout has been submitted for approval, it may take up to 48 hours (excl. public
        holidays and weekends) to appear in your bank account processed
      </Text>
    </View>
  );
};

PayOutCompleteScreen.propTypes = {};

PayOutCompleteScreen.defaultProps = {};

export default PayOutCompleteScreen;
