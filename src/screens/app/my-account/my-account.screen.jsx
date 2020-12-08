import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Divider, Text, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from '../../../components/containers';
import {
  LoadingComponent,
  MembershipCard,
  CreditCard,
  BankAccount,
} from '../../../components/molecules';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';

const MyAccountScreen = () => {
  const { loading } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const { creditCards } = useSelector((reducers) => reducers.creditCardReducer);
  const { bankAccounts } = useSelector((reducers) => reducers.bankAccountReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserAction());
    }, []),
  );

  return !loading ? (
    <PageContainer>
      <Text h4>Winners Circle Cards</Text>
      <Button title="Add Winners Circle" onPress={() => navigation.navigate('AddMembershipCard')} />
      <Divider />
      {membershipCards.map((card) => {
        return <MembershipCard key={card.id} card={card} hasDelete />;
      })}

      <Divider />

      <Text h4>Credit Cards</Text>
      <Button title="Add Credit Card" onPress={() => navigation.navigate('AddCreditCard')} />
      <Divider />
      {creditCards.map((item) => {
        return <CreditCard key={item.id} card={item} hasDelete />;
      })}

      <Divider />

      <Text h4>Bank Accounts</Text>
      <Button title="Add Bank Account" onPress={() => navigation.navigate('AddBankAccount')} />
      <Divider />
      {bankAccounts.map((item) => {
        return <BankAccount key={item.id} account={item} hasDelete />;
      })}
    </PageContainer>
  ) : (
    <LoadingComponent />
  );
};

MyAccountScreen.propTypes = {};

MyAccountScreen.defaultProps = {};

export default MyAccountScreen;
