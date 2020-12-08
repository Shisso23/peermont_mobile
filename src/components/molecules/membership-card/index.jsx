import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Button, Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { promptConfirmDelete } from '../../../helpers/prompt.helper';
import { deleteMembershipCardAction } from '../../../reducers/membership-card-reducer/membership-card.actions';
import { getMembershipCardImage } from './utils';

const MembershipCard = ({ hasDelete, card, onPress }) => {
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
    <ListItem key={card.id} bottomDivider onPress={onPress}>
      <Avatar size="medium" imageProps={{ resizeMode: 'contain' }} source={imagePath} />
      <ListItem.Content>
        <ListItem.Title>{card.cardNumber}</ListItem.Title>
        <ListItem.Subtitle>{card.tierName}</ListItem.Subtitle>
      </ListItem.Content>
      {hasDelete && <Button title="Delete" onPress={_handleDelete} loading={isDeleting} />}
    </ListItem>
  );
};

MembershipCard.propTypes = {
  hasDelete: PropTypes.bool,
  card: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

MembershipCard.defaultProps = {
  hasDelete: false,
  onPress: () => null,
};

export default MembershipCard;
