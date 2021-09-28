import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';

import getCardType from '../../../helpers/getCardType';
import { useMembershipCard } from '../../../hooks';
import colors from '../../../../theme/theme.colors';

const MembershipCardCarouselItem = ({ item, index, unconfirmedMobileNumber }) => {
  const { viewMembershipCard } = useMembershipCard();
  return (
    <TouchableOpacity
      onPress={() => viewMembershipCard(_.get(item, 'id'), index, unconfirmedMobileNumber)}
    >
      <Image
        resizeMode="contain"
        style={styles.carouselImage}
        source={getCardType(_.get(item, 'tierName'))}
      />
      <Text style={styles.carouselCardNumber}>{_.get(item, 'cardNumber')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carouselCardNumber: {
    alignSelf: 'center',
    bottom: 15,
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  carouselImage: {
    height: 200,
    width: 250,
  },
});

MembershipCardCarouselItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  unconfirmedMobileNumber: PropTypes.string,
};

MembershipCardCarouselItem.defaultProps = {
  unconfirmedMobileNumber: '',
};

export default MembershipCardCarouselItem;
