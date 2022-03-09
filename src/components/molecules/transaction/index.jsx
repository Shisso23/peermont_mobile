import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { paymentTransactionModel } from '../../../models/app/payment/payment.model';

const Transaction = ({ transaction }) => {
  const transactionData = paymentTransactionModel(transaction);

  return (
    <ListItem key={_.get(transaction, 'id')} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{`${transactionData.paymentProvider} ${transactionData.payableType}`}</ListItem.Title>
        <ListItem.Subtitle>{transactionData.paymentType}</ListItem.Subtitle>
        <ListItem.Subtitle>{transactionData.updatedAt}</ListItem.Subtitle>
        {transactionData.payable && (
          <ListItem.Subtitle>{transactionData.payable}</ListItem.Subtitle>
        )}
      </ListItem.Content>
      <ListItem.Content style={styles.alignRight}>
        <Divider />
        <ListItem.Title h4>{transactionData.amount}</ListItem.Title>
        <ListItem.Subtitle>{transactionData.status}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object,
};

Transaction.defaultProps = {
  transaction: {},
};

const styles = StyleSheet.create({
  alignRight: {
    alignItems: 'flex-end',
  },
});

export default Transaction;
