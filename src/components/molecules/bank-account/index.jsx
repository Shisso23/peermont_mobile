import React, { useState } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteBankAccountAction } from '../../../reducers/bank-account-reducer/bank-account.actions';
import { useBankUri } from '../../../hooks';
import { TrashButton, BankAccountStatus } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const BankAccount = ({ hasDelete, hasDisabled, account, onPress, hasAccountStatus, style }) => {
  const [isDeleting, setDeleting] = useState(false);

  const { bankUri } = useBankUri(account.bankId);

  const dispatch = useDispatch();
  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteBankAccountAction(account.id));
    });
  };

  return (
    <ListItem
      key={account.id}
      onPress={onPress}
      containerStyle={style}
      bottomDivider
      disabled={hasDisabled && account.status !== 'verified'}
    >
      <Avatar source={_.isEmpty(bankUri) ? null : { uri: bankUri }} />
      <ListItem.Content>
        <ListItem.Title>{account.accountNumber}</ListItem.Title>
        <ListItem.Subtitle>{account.accountHolder}</ListItem.Subtitle>
      </ListItem.Content>
      {hasAccountStatus && <BankAccountStatus status={account.status} />}
      {hasDelete && (
        <TrashButton
          onPress={_handleDelete}
          loading={isDeleting}
          containerStyle={custom.trashButtonContainer}
        />
      )}
    </ListItem>
  );
};

BankAccount.propTypes = {
  hasDelete: PropTypes.bool,
  account: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  hasAccountStatus: PropTypes.bool,
  style: ViewPropTypes.style,
  hasDisabled: PropTypes.bool,
};

BankAccount.defaultProps = {
  hasDelete: false,
  hasAccountStatus: false,
  onPress: () => null,
  style: {},
  hasDisabled: false,
};

export default BankAccount;
