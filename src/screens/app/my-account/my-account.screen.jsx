import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListItem, Divider, Text, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from '../../../components/containers';
import { LoadingComponent } from '../../../components/molecules';
import { getUserAction } from '../../../reducers/user-reducer/user.actions';
import { deleteMembershipCardAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { deleteCreditCardAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { deleteBankAccountAction } from '../../../reducers/bank-account-reducer/bank-account.actions';
import { promptConfirmDelete } from '../../../helpers/prompt.helper';

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

  const _handleDelete = (id, action) => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      if (action) {
        dispatch(action(id));
      }
    });
  };

  return !loading ? (
    <PageContainer>
      <Text h4>Winners Circle Cards</Text>
      <Button title="Add Winners Circle" onPress={() => navigation.navigate('AddMembershipCard')} />
      {membershipCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.cardNumber}</ListItem.Title>
            </ListItem.Content>
            <Button
              title="Delete"
              onPress={() => _handleDelete(item.id, deleteMembershipCardAction)}
            />
          </ListItem>
        );
      })}
      <Divider />
      <Text h4>Credit Cards</Text>
      <Button title="Add Credit Card" onPress={() => navigation.navigate('AddCreditCard')} />
      {creditCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.obfuscatedCardNumber}</ListItem.Title>
            </ListItem.Content>
            <Button title="Delete" onPress={() => _handleDelete(item.id, deleteCreditCardAction)} />
          </ListItem>
        );
      })}
      <Divider />
      <Text h4>Bank Accounts</Text>
      <Button title="Add Bank Account" onPress={() => navigation.navigate('AddBankAccount')} />
      {bankAccounts.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.accountNumber}</ListItem.Title>
            </ListItem.Content>
            <Button
              title="Delete"
              onPress={() => _handleDelete(item.id, deleteBankAccountAction)}
            />
          </ListItem>
        );
      })}
    </PageContainer>
  ) : (
    <LoadingComponent />
  );
};

MyAccountScreen.propTypes = {};

MyAccountScreen.defaultProps = {};

export default MyAccountScreen;
