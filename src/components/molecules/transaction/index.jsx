import React from 'react';
import { ListItem, Divider } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { paymentTransactionModel } from '../../../models/app/payment/payment.model';
import { custom } from '../../../../theme/theme.styles';

const Transaction = ({ transaction }) => {
  const transactionData = paymentTransactionModel(transaction);

  return (
    <ListItem key={_.get(transaction, 'id')} bottomDivider>
      <ListItem.Content>
        {_.isEqual(transactionData.paymentType, 'Payout') ? (
          <ListItem.Title>{`${_.isNull(transactionData.bank) ? '' : `${transactionData.bank} `}${
            transactionData.payableType
          }`}</ListItem.Title>
        ) : _.isEqual(transactionData.payableType, 'Credit card') ? (
          <ListItem.Title>{`${transactionData.payableType}`}</ListItem.Title>
        ) : (
          <ListItem.Title>{`${transactionData.paymentProvider} ${transactionData.payableType}`}</ListItem.Title>
        )}
        <ListItem.Subtitle>{transactionData.paymentType}</ListItem.Subtitle>
        <ListItem.Subtitle>{transactionData.updatedAt}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={custom.alignRight}>
        {transactionData.payable ? (
          <ListItem.Subtitle>{transactionData.payable}</ListItem.Subtitle>
        ) : (
          <Divider />
        )}
        <ListItem.Title h4>{`R${transactionData.amount}`}</ListItem.Title>
        <ListItem.Subtitle style={custom.statusText}>{transactionData.status}</ListItem.Subtitle>
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

export default Transaction;
