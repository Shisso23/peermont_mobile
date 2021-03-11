import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteCreditCardAction } from '../../../reducers/credit-card-reducer/credit-card.actions';
import { TrashButton } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const creditCardPath = require('../../../assets/images/credit-card.png');

const CreditCard = ({ hasDelete, card, onPress, disabled, style }) => {
  const [isDeleting, setDeleting] = useState(false);

  const dispatch = useDispatch();
  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteCreditCardAction(card.id));
    });
  };

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
    </ListItem>
  );
};

CreditCard.propTypes = {
  hasDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

CreditCard.defaultProps = {
  hasDelete: false,
  disabled: false,
  onPress: () => null,
  style: {},
};

export default CreditCard;
