import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import Moment from 'moment';
import PropTypes from 'prop-types';

const Transaction = ({ transaction }) => {
  const getPayableNumber = (item) => {
    const bank = _.get(item, 'payable.bank_account.account_number', null);
    const creditCard = _.get(item, 'payable.credit_card.obfuscated_card_number', null);

    if (!_.isNull(bank)) {
      return bank;
    }
    return creditCard;
  };

  const payableType = _.startCase(_.get(transaction, 'payable_type'));
  const updatedAt = Moment(_.get(transaction, 'updated_at')).format('YYYY/MM/DD, HH:MM');
  const payable = getPayableNumber(transaction);
  const amount = (_.get(transaction, 'total.cents') / 100).toFixed(2);
  const status = _.capitalize(_.get(transaction, 'status'));

  return (
    <ListItem key={_.get(transaction, 'id')} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{payableType}</ListItem.Title>
        <ListItem.Subtitle>{updatedAt}</ListItem.Subtitle>
        {payable && <ListItem.Subtitle>{payable}</ListItem.Subtitle>}
      </ListItem.Content>
      <ListItem.Content style={styles.alignRight}>
        <ListItem.Title h4>{amount}</ListItem.Title>
        <ListItem.Subtitle>{status}</ListItem.Subtitle>
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
