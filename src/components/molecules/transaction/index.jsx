import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import _ from 'lodash';
import Moment from 'moment';
import PropTypes from 'prop-types';

import colors from '../../../../theme/theme.colors';

const Transaction = ({ transaction }) => {
  const getPayableNumber = (item) => {
    const bank = _.get(item, 'payable.bank_account.account_number', null);
    const creditCard = _.get(item, 'payable.credit_card.obfuscated_card_number', null);

    if (!_.isNull(bank)) {
      return bank;
    }
    return creditCard;
  };

  const payableType = _.get(transaction, 'payable_type');
  const updatedAt = Moment(_.get(transaction, 'updated_at')).format('YYYY/MM/DD, hh:mm');
  const payable = getPayableNumber(transaction);
  const amount = (_.get(transaction, 'total.cents') / 100).toFixed(2);
  const status = _.get(transaction, 'status');

  return (
    <ListItem key={_.get(transaction, 'id')} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{payableType}</ListItem.Title>
        <View style={styles.container}>
          <View>
            <ListItem.Subtitle>{updatedAt}</ListItem.Subtitle>
            <ListItem.Subtitle>{payable}</ListItem.Subtitle>
          </View>
          <View style={styles.alignRight}>
            <Text style={styles.amountStyle}>R{amount}</Text>
            <Text style={styles.statusStyle}>{status}</Text>
          </View>
        </View>
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
  amountStyle: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusStyle: {
    color: colors.darkGrey,
  },
});

export default Transaction;
