import React, { useEffect, useState } from 'react';
import { ViewPropTypes } from 'react-native';
import { ListItem, Avatar, CheckBox } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteCreditCardAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { TrashButton } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const creditCardPath = require('../../../assets/images/credit-card.png');

const CreditCard = ({
  hasDelete,
  card,
  onPress,
  disabled,
  style,
  hasCheckBox,
  isCheckBoxSelected,
}) => {
  const dispatch = useDispatch();

  const [isDeleting, setDeleting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteCreditCardAction(card.id));
    });
  };
  const _handleIsCheckBoxSelected = () => setIsChecked(isCheckBoxSelected);

  useEffect(() => {
    _handleIsCheckBoxSelected();
  }, [isCheckBoxSelected]);

  return (
    <ListItem
      key={card.id}
      onPress={onPress}
      containerStyle={style}
      bottomDivider
      disabled={disabled}
      disabledStyle={custom.disabledTouchable}
    >
      <Avatar source={creditCardPath} imageProps={{ resizeMode: 'contain' }} size="medium" />
      <ListItem.Content>
        <ListItem.Title>{card.obfuscatedCardNumber}</ListItem.Title>
        <ListItem.Subtitle>{card.cardType}</ListItem.Subtitle>
      </ListItem.Content>
      {hasDelete && <TrashButton onPress={_handleDelete} loading={isDeleting} />}
      {hasCheckBox && <CheckBox checked={isChecked} disabled />}
    </ListItem>
  );
};

CreditCard.propTypes = {
  hasDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  hasCheckBox: PropTypes.bool,
  isCheckBoxSelected: PropTypes.bool,
};

CreditCard.defaultProps = {
  hasDelete: false,
  disabled: false,
  onPress: () => null,
  style: {},
  hasCheckBox: false,
  isCheckBoxSelected: false,
};

export default CreditCard;
