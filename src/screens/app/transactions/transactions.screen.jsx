import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../components/containers';
import { LoadingComponent, Transaction } from '../../../components';
import { getTransactions } from '../../../reducers/payments-reducer/payments.actions';
import { custom } from '../../../../theme/theme.styles';

const TransactionsScreen = () => {
  const { transactions, isLoading } = useSelector((reducers) => reducers.paymentReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTransactions());
    }, []),
  );

  return !isLoading ? (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Mobile App Transactions</Text>
      </PaddedContainer>
      {transactions.map((transaction) => {
        return <Transaction transaction={transaction} key={_.get(transaction, 'id')} />;
      })}
      <Divider />
    </ScrollContainer>
  ) : (
    <LoadingComponent />
  );
};

TransactionsScreen.propTypes = {};

TransactionsScreen.defaultProps = {};

export default TransactionsScreen;
