import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { prettyOutputText } from '../../../dev-utils';

const MembershipCardDetailScreen = () => {
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);
  const navigation = useNavigation();
  return (
    <View>
      {prettyOutputText(currentMembershipCard)}
      <Button title="Top up" onPress={() => navigation.push('TopUp')} />
      <Button title="Pay out" onPress={() => navigation.push('PayOut')} />
    </View>
  );
};

const styles = StyleSheet.create({});

MembershipCardDetailScreen.propTypes = {};

MembershipCardDetailScreen.defaultProps = {};

export default MembershipCardDetailScreen;
