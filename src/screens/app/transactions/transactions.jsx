import React from 'react';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { PageContainer } from '../../../components/containers';
import { LoadingComponent, Transaction } from '../../../components';
import { getTransactions } from '../../../reducers/payments-reducer/payments.actions';

const TransactionsScreen = () => {
  const { transactions, isLoading } = useSelector((reducers) => reducers.paymentReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTransactions());
    }, []),
  );

  return !isLoading ? (
    <PageContainer>
      <Text h4>Mobile App Transactions</Text>
      {transactions.map((transaction) => {
        return <Transaction transaction={transaction} key={_.get(transaction, 'id')} />;
      })}
    </PageContainer>
  ) : (
    <LoadingComponent />
  );
};

TransactionsScreen.propTypes = {};

TransactionsScreen.defaultProps = {};

export default TransactionsScreen;
