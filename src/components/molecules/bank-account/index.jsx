import React, { useEffect, useState } from 'react';
import { ViewPropTypes } from 'react-native';
import { ListItem, Avatar, CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteBankAccountAction } from '../../../reducers/bank-account-reducer/bank-account.actions';
import { useBankUri } from '../../../hooks';
import { TrashButton, BankAccountStatus } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const BankAccount = ({
  hasDelete,
  account,
  onPress,
  disabled,
  hasAccountStatus,
  style,
  hasCheckBox,
  isCheckBoxSelected,
}) => {
  const dispatch = useDispatch();

  const [isDeleting, setDeleting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { isLoading } = useSelector((reducer) => reducer.bankAccountReducer);
  const { bankUri } = useBankUri(account.bankId);

  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteBankAccountAction(account.id));
    });
  };
  const _handleIsCheckBoxSelected = () => setIsChecked(isCheckBoxSelected);

  useEffect(() => {
    _handleIsCheckBoxSelected();
  }, [isCheckBoxSelected]);

  return (
    <ListItem
      key={account.id}
      onPress={onPress}
      containerStyle={style}
      bottomDivider
      disabled={disabled || isLoading}
      disabledStyle={custom.disabledTouchable}
    >
      <Avatar source={_.isEmpty(bankUri) ? null : { uri: bankUri }} />
      <ListItem.Content>
        <ListItem.Title>{account.accountNumber}</ListItem.Title>
        <ListItem.Subtitle>{account.accountHolder}</ListItem.Subtitle>
      </ListItem.Content>
      {hasAccountStatus && (!hasCheckBox || disabled) && (
        <BankAccountStatus status={account.status} />
      )}
      {hasDelete && <TrashButton onPress={_handleDelete} loading={isDeleting} />}
      {hasCheckBox && !disabled && <CheckBox checked={isChecked} disabled />}
    </ListItem>
  );
};

BankAccount.propTypes = {
  hasDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  account: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  hasAccountStatus: PropTypes.bool,
  style: ViewPropTypes.style,
  hasCheckBox: PropTypes.bool,
  isCheckBoxSelected: PropTypes.bool,
};

BankAccount.defaultProps = {
  hasDelete: false,
  disabled: false,
  hasAccountStatus: false,
  onPress: () => null,
  style: {},
  hasCheckBox: false,
  isCheckBoxSelected: false,
};

export default BankAccount;
