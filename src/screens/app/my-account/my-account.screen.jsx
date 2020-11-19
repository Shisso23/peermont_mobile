import React from 'react';
import { Alert } from 'react-native';
import { ListItem, Divider, Text, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollContainer } from '../../../components/containers';
import { deleteMembershipCardAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { deleteCreditCardAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { deleteBankAccountAction } from '../../../reducers/bank-account-reducer/bank-account.actions';

const MyAccountScreen = () => {
  const { membershipCards } = useSelector((reducers) => reducers.membershipCardReducer);
  const { creditCards } = useSelector((reducers) => reducers.creditCardReducer);
  const { bankAccounts } = useSelector((reducers) => reducers.bankAccountReducer);
  const dispatch = useDispatch();

  const _handleDelete = (id, action) => {
    Alert.alert(
      'You sure?',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (action) {
              dispatch(action(id));
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollContainer>
      <Text h4>Winners Circle Cards</Text>
      {membershipCards.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.cardNumber}</ListItem.Title>
            </ListItem.Content>
            <Button title="Delete" onPress={() => _handleDelete(item.id, deleteMembershipCardAction)} />
          </ListItem>
        );
      })}
      <Divider />
      <Text h4>Credit Cards</Text>
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
      {bankAccounts.map((item) => {
        return (
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.accountNumber}</ListItem.Title>
            </ListItem.Content>
            <Button title="Delete" onPress={() => _handleDelete(item.id, deleteBankAccountAction)} />
          </ListItem>
        );
      })}
    </ScrollContainer>
  );
};

MyAccountScreen.propTypes = {};

MyAccountScreen.defaultProps = {};

export default MyAccountScreen;
