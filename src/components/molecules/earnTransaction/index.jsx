import React from 'react';
import { ListItem } from '@rneui/themed';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { custom } from '../../../../theme/theme.styles';
import { earnTransactionModel } from '../../../models';

const EarnTrasaction = ({ transaction }) => {
  const transactionData = earnTransactionModel(transaction);

  return (
    <ListItem key={_.get(transaction, 'id')} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{`${transactionData.reference}`}</ListItem.Title>
        <ListItem.Subtitle>{transactionData.vendorName}</ListItem.Subtitle>
        <ListItem.Subtitle>{transactionData.date}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={custom.alignRight}>
        <ListItem.Title h4>{transactionData.vendorName}</ListItem.Title>
        <ListItem.Title h4>{`R${transactionData.value}`}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

EarnTrasaction.propTypes = {
  transaction: PropTypes.object,
};

EarnTrasaction.defaultProps = {
  transaction: {},
};

export default EarnTrasaction;
