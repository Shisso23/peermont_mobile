import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordLink = ({ containerStyle }) => {
  const navigation = useNavigation();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.alignCenter}
        delayPressIn={0}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text>Reset Password</Text>
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
