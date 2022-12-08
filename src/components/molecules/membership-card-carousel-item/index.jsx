import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  membershipCardSelector,
  setCurrentMembershipCardAction,
} from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { MembershipCardInput } from '../../atoms';
import { getCardType } from '../../../helpers/getCardType';
import { custom } from '../../../../theme/theme.styles';

const MembershipCardCarouselItem = ({
  item,
  index,
  unconfirmedMobileNumber,
  closeModal,
  cardSelected,
}) => {
  const dispatch = useDispatch();
  const { membershipCardPins } = useSelector(membershipCardSelector);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const showModal = () => {
    dispatch(setCurrentMembershipCardAction(_.get(item, 'id')));
    cardSelected(index);
    if (_.isEqual(cardSelected(), null)) {
      setShowMembershipModal(true);
    }
  };

  const _closeModal = (close) => {
    setShowMembershipModal(close);
    if (close) {
      closeModal();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <Image
          resizeMode="contain"
          style={custom.carouselImage}
          source={getCardType(_.get(item, 'tierName'))}
        />
        <Text style={custom.carouselCardNumber}>{_.get(item, 'cardNumber')}</Text>
      </TouchableOpacity>
      <MembershipCardInput
        visible={showMembershipModal}
        closeModal={_closeModal}
        cardPin={_.get(membershipCardPins[index], 'card_pin')}
        unconfirmedMobileNumber={unconfirmedMobileNumber}
      />
    </>
  );
};

MembershipCardCarouselItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  unconfirmedMobileNumber: PropTypes.string,
  closeModal: PropTypes.func,
  cardSelected: PropTypes.func,
};

MembershipCardCarouselItem.defaultProps = {
  unconfirmedMobileNumber: '',
  closeModal: () => null,
  cardSelected: () => null,
};

export default MembershipCardCarouselItem;
