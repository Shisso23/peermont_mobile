import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import {
  LoadingComponent,
  MembershipCard,
  CreditCard,
  BankAccount,
  BiometricSettings,
  PushNotificationSettings,
  SmsSettings,
} from '../../../components/molecules';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { getCreditCardsAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { AddButton, Watermark } from '../../../components/atoms';
import { useRefreshHeaderButton } from '../../../hooks';
import { custom } from '../../../../theme/theme.styles';

const MyAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((reducers) => reducers.userReducer);
  const { membershipCards } = useSelector(membershipCardSelector);
  const { creditCards } = useSelector((reducers) => reducers.creditCardReducer);
  const { bankAccounts } = useSelector((reducers) => reducers.bankAccountReducer);

  const _handleBankUpdateNav = (bankAccount) => {
    navigation.navigate('UploadBankAccountDocument', {
      bankAccountId: _.get(bankAccount, 'id'),
    });
  };

  const _handleDailyTopUpLimit = () => navigation.navigate('DailyTopUpLimit');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserAction());
      dispatch(getCreditCardsAction());
    }, []),
  );

  useRefreshHeaderButton(() => {
    dispatch(getUserAction());
  }, loading);

  const RenderMembershipCards = () => (
    <>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Winners Circle Cards</Text>
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
          return <MembershipCard key={card.id} card={card} hasDelete disabled />;
        })
      )}
    </>
  );

  const RenderCreditCards = () => (
    <>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Credit Cards</Text>
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
          return <CreditCard key={item.id} card={item} hasDelete disabled />;
        })
      )}
    </>
  );

  const RenderBankCards = () => (
    <>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Payout Bank Accounts</Text>
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
              disabled={_.get(item, 'status') === 'verified'}
            />
          );
        })
      )}
    </>
  );

  const RenderSettings = () => (
    <>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Biometric Login</Text>
          <BiometricSettings />
        </View>
      </PaddedContainer>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>Push Notifications</Text>
          <PushNotificationSettings />
        </View>
      </PaddedContainer>
      <PaddedContainer>
        <View style={styles.rowAlign}>
          <Text h4>SMS Notifications</Text>
          <SmsSettings />
        </View>
      </PaddedContainer>
    </>
  );

  return !loading ? (
    <>
      <Watermark />
      <ScrollContainer>
        <PaddedContainer>
          <Text style={custom.centerTitle}>My Account</Text>
        </PaddedContainer>
        <RenderMembershipCards />
        <RenderCreditCards />
        <RenderBankCards />
        <ListItem onPress={_handleDailyTopUpLimit} bottomDivider>
          <ListItem.Content>
            <ListItem.Title h4 style={custom.bold}>
              Responsible Gaming Settings
            </ListItem.Title>
          </ListItem.Content>
          <Icon name="cog" type="font-awesome-5" />
        </ListItem>
        <RenderSettings />
      </ScrollContainer>
    </>
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
