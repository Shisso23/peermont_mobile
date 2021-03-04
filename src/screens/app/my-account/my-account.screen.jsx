import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, Divider, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import {
  LoadingComponent,
  MembershipCard,
  CreditCard,
  BankAccount,
} from '../../../components/molecules';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { AddButton } from '../../../components/atoms';
import { useRefreshHeaderButton } from '../../../hooks';

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

  useRefreshHeaderButton(() => {
    dispatch(getUserAction());
  });

  return !loading ? (
    <ScrollContainer>
      <Divider />
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h3>Winners Circle Cards</Text>
          <AddButton
            onPress={() => navigation.navigate('AddMembershipCard')}
            containerStyle={styles.addPadding}
          />
        </View>
      </PaddedContainer>
      {_.isEmpty(membershipCards) ? (
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>You don&#39;t have any Winners Circle Cards setup</ListItem.Title>
            <ListItem.Subtitle>Click the plus button above to add a card.</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
        membershipCards.map((card) => {
          return <MembershipCard key={card.id} card={card} hasDelete />;
        })
      )}

      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h3>Credit Cards</Text>
          <AddButton
            onPress={() => navigation.navigate('AddCreditCard')}
            containerStyle={styles.addPadding}
          />
        </View>
      </PaddedContainer>
      {_.isEmpty(creditCards) ? (
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>You don&#39;t have any credit cards setup</ListItem.Title>
            <ListItem.Subtitle>Click the plus button above to add a credit card.</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
        creditCards.map((item) => {
          return <CreditCard key={item.id} card={item} hasDelete />;
        })
      )}
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h3>Bank Accounts</Text>
          <AddButton
            onPress={() => navigation.navigate('AddBankAccount')}
            containerStyle={styles.addPadding}
          />
        </View>
      </PaddedContainer>
      {_.isEmpty(bankAccounts) ? (
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>You don&#39;t have any bank accounts setup</ListItem.Title>
            <ListItem.Subtitle>
              Click the plus button above to add a bank account.
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
        bankAccounts.map((item) => {
          return (
            <BankAccount
              key={item.id}
              account={item}
              hasDelete
              hasAccountStatus
              onPress={() => _handleBankUpdateNav(item)}
            />
          );
        })
      )}
    </ScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

MyAccountScreen.propTypes = {};

MyAccountScreen.defaultProps = {};

const styles = StyleSheet.create({
  addPadding: {
    paddingLeft: 10,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyAccountScreen;
