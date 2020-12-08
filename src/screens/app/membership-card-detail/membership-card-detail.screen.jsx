import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { prettyOutputText } from '../../../dev-utils';
import { PageContainer } from '../../../components/containers';

const MembershipCardDetailScreen = () => {
  const { currentMembershipCard } = useSelector((reducers) => reducers.membershipCardReducer);
  const navigation = useNavigation();
  return (
    <PageContainer>
      {prettyOutputText(currentMembershipCard)}
      <Divider />
      <Button title="Top up" onPress={() => navigation.push('TopUp')} />
      <Divider />
      <Button title="Pay out" onPress={() => navigation.push('PayOut')} />
    </PageContainer>
  );
};

MembershipCardDetailScreen.propTypes = {};

MembershipCardDetailScreen.defaultProps = {};

export default MembershipCardDetailScreen;
