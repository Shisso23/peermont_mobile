import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordLink = ({ containerStyle }) => {
  const navigation = useNavigation();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.alignCenter}
        delayPressIn={0}
        onPress={() => navigation.push('ForgotPassword')}
      >
        <Text>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

ForgotPasswordLink.propTypes = {
  containerStyle: ViewPropTypes.style,
};

ForgotPasswordLink.defaultProps = {
  containerStyle: {},
};

export default ForgotPasswordLink;
