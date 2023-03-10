import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteMembershipCardAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { getMembershipCardImage } from './utils';
import { TrashButton } from '../../atoms';
import { custom } from '../../../../theme/theme.styles';

const MembershipCard = ({ hasDelete, card, onPress, disabled }) => {
  const dispatch = useDispatch();
  const imagePath = getMembershipCardImage(card.tierName);
  const [isDeleting, setDeleting] = useState(false);

  const _handleDelete = () => {
    promptConfirmDelete('Are you sure you want to delete this item?', () => {
      setDeleting(true);
      dispatch(deleteMembershipCardAction(card.id));
    });
  };

  return (
    <ListItem
      key={card.id}
      bottomDivider
      onPress={onPress}
      disabled={disabled}
      disabledStyle={custom.disabledTouchable}
    >
      <Avatar size="medium" imageProps={{ resizeMode: 'contain' }} source={imagePath} />
      <ListItem.Content>
        <ListItem.Title>{card.cardNumber}</ListItem.Title>
        <ListItem.Subtitle>{card.tierName}</ListItem.Subtitle>
      </ListItem.Content>
      {hasDelete && <TrashButton onPress={_handleDelete} loading={isDeleting} />}
      {!hasDelete && <ListItem.Chevron />}
    </ListItem>
  );
};

MembershipCard.propTypes = {
  hasDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

MembershipCard.defaultProps = {
  hasDelete: false,
  disabled: false,
  onPress: () => null,
};

export default MembershipCard;
