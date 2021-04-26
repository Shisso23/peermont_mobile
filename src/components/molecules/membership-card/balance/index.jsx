import { ListItem, Text } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';

const MembershipCardBalance = ({ name, value } = {}) => (
  <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title>{name}</ListItem.Title>
    </ListItem.Content>
    <Text h4>{value}</Text>
  </ListItem>
);

MembershipCardBalance.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MembershipCardBalance;
