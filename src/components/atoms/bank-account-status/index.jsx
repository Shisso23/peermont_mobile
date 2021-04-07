import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../theme/theme.colors';

const BankAccountStatus = ({ status }) => {
  let icon;
  let color;
  let textStyle;
  if (status === 'pending') {
    icon = 'hourglass';
    color = colors.warning;
    textStyle = { color };
    status = 'Pending';
  } else if (status === 'verified') {
    icon = 'check-circle';
    color = colors.success;
    textStyle = { color };
    status = 'Verified';
  } else if (status === 'approval_required') {
    icon = 'clock';
    color = colors.warning;
    textStyle = { color };
    status = 'Awaiting approval';
  } else {
    icon = 'times';
    color = colors.danger;
    textStyle = { color };
  }
  return (
    <View style={styles.rowAlign}>
      <Icon name={icon} backgroundColor="transparent" color={color} style={styles.icon} />
      <Text style={textStyle}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 3,
    marginTop: 2,
  },
  rowAlign: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

BankAccountStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

BankAccountStatus.defaultProps = {};

export default BankAccountStatus;
