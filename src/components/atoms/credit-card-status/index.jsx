import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import _ from 'lodash';

import colors from '../../../../theme/theme.colors';

const CreditCardStatus = ({ status }) => {
  let icon;
  let color;
  let textStyle;
  if (status === 'expired') {
    icon = 'times';
    color = colors.danger;
    textStyle = { color };
    status = 'Expired';
  } else {
    status = null;
  }
  return _.isNull(status) ? null : (
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

CreditCardStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

CreditCardStatus.defaultProps = {};

export default CreditCardStatus;
