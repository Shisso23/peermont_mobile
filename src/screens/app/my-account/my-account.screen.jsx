import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import { PageContainer } from '../../../components/containers';
import {
  LoadingComponent,
  MembershipCard,
  CreditCard,
  BankAccount,
} from '../../../components/molecules';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { AddButton } from '../../../components/atoms';

const MyAccountScreen = () => {
  const { loading } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const { creditCards } = useSelector((reducers) => reducers.creditCardReducer);
  const { bankAccounts } = useSelector((reducers) => reducers.bankAccountReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleBankUpdateNav = (bankAccount) => {
    if (bankAccount.status !== 'verified') {
      navigation.push('UploadBankAccountDocument', {
        bankAccountId: _.get(bankAccount, 'id'),
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserAction());
    }, []),
  );

  return !loading ? (
    <PageContainer>
      <Text h3>My Account</Text>
      <View style={styles.rowAlign}>
        <Text h4>Winners Circle Cards</Text>
        <AddButton
          onPress={() => navigation.navigate('AddMembershipCard')}
          containerStyle={styles.addPadding}
        />
      </View>

      <Divider />
      {membershipCards.map((card) => {
        return <MembershipCard key={card.id} card={card} hasDelete />;
      })}

      <Divider />

      <View style={styles.rowAlign}>
        <Text h4>Credit Cards</Text>
        <AddButton
          onPress={() => navigation.navigate('AddCreditCard')}
          containerStyle={styles.addPadding}
        />
      </View>

      <Divider />
      {creditCards.map((item) => {
        return <CreditCard key={item.id} card={item} hasDelete />;
      })}

      <Divider />
      <View style={styles.rowAlign}>
        <Text h4>Bank Accounts</Text>
        <AddButton
          onPress={() => navigation.navigate('AddBankAccount')}
          containerStyle={styles.addPadding}
        />
      </View>
      <Divider />
      {bankAccounts.map((item) => {
        return (
          <BankAccount
            key={item.id}
            account={item}
            hasDelete
            hasAccountStatus
            onPress={() => _handleBankUpdateNav(item)}
          />
        );
      })}
    </PageContainer>
  ) : (
    <LoadingComponent />
  );
};

MyAccountScreen.propTypes = {};

MyAccountScreen.defaultProps = {};
const styles = StyleSheet.create({
  addPadding: {
    paddingHorizontal: 15,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyAccountScreen;
