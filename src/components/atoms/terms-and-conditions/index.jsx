import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import colors from '../../../../theme/theme.colors';

const TermsAndConditions = ({ checked, onPress }) => {
  return (
    <View style={styles.wrapper}>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
        checkedColor={colors.primary}
      />
      <Text>I agree to the</Text>
      <TouchableOpacity delayPressIn={0} onPress={() => null}>
        <Text style={styles.link}> Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};

TermsAndConditions.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  link: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

export default TermsAndConditions;
